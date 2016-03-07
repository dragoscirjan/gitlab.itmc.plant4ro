<?php

namespace Ppr\Mvc\Controller;

use Ppr\Application;
use Ppr\Http\Response;
use Ppr\Mvc\Model;

use Braintree;
use MarkWilson\XmlToJson\XmlToJsonConverter;
use Symfony\Component\HttpFoundation\Request;

class Donate {

    /********************************************************
     * Public Declarations
     ********************************************************/

    /**
     * @param Application $app
     * @return Response
     */
    public function exchangeRate(Application $app) {
        try {
            return Response::response(array(
                'error' => 0,
                'exchange' => (new XmlToJsonConverter())->asArray(
                    new \SimpleXMLElement(file_get_contents('http://www.bnr.ro/nbrfxrates.xml'))
                ),
            ));
        } catch(\Exception $e) {
            $app->getLogger()->err("{$e->getMessage()}\n{$e->getTraceAsString()}");
            return Response::response500(array(
                'error' => 'Failed grabbing exchange rate',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ));
        }
    }

    /**
     * @param Application $app
     * @return Response
     */
    public function braintreeClientToken(Application $app) {
        try {
            $this->braintreeInit($app);
            $token = Braintree\ClientToken::generate();
            $app->getLogger()->notice(sprintf(
                'Braintree token `%s` generated from `%s`',
                $token,
                $_SERVER['REMOTE_ADDR']
            ));

            return Response::response(array(
                'error' => 0,
                'token' => $token,
            ));
        } catch (\Exception $e) {
            $app->getLogger()->err("{$e->getMessage()}\n{$e->getTraceAsString()}");
            return Response::response500(array(
                'error' => 'Could not initiate Braintree Token',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ));
        }
    }

    /**
     * @param Application $app
     */
    public function mobilpayClientToken(Application $app, Request $request) {
        try {
            // decode load to obtain information
            $load = json_decode(base64_decode($request->get('load')));

            srand((double) microtime() * 1000000);
            $objPmReqCard = new \Mobilpay_Payment_Request_Card();
            $objPmReqCard->signature = $app->getConfig('payment.mobilpay.signature');
            $objPmReqCard->orderId = md5(uniqid(rand()));
            $objPmReqCard->confirmUrl = $app->getConfig('payment.mobilpay.confirmUrl');
            $objPmReqCard->returnUrl = $app->getConfig('payment.mobilpay.returnUrl');
            $objPmReqCard->invoice = new \Mobilpay_Payment_Invoice();
            $objPmReqCard->invoice->currency = 'RON';
            $objPmReqCard->invoice->amount = $load->payment->total;
            //$objPmReqCard->invoice->installments= '2,3';
            //$objPmReqCard->invoice->selectedInstallments= '3';
            $objPmReqCard->invoice->details = 'Donatie cu card-ul prin mobilPay';

            $billingAddress = new \Mobilpay_Payment_Address();
            $billingAddress->type = 'person';
            $billingAddress->firstName = array_shift(explode(' ', $load->name));
            $billingAddress->lastName = array_pop(explode(' ', $load->name));
            $billingAddress->address = 'Romania';
            $billingAddress->email = $load->email;
            if (!empty($load->phone)) {
                $billingAddress->mobilePhone = $load->phone;
            }
            $objPmReqCard->invoice->setBillingAddress($billingAddress);

//            $shippingAddress 				= new Mobilpay_Payment_Address();
//            $shippingAddress->type			= $_POST['shipping_type'];
//            $shippingAddress->firstName		= $_POST['shipping_first_name'];
//            $shippingAddress->lastName		= $_POST['shipping_last_name'];
//            $shippingAddress->address		= $_POST['shipping_address'];
//            $shippingAddress->email		= $_POST['shipping_email'];
//            $shippingAddress->mobilePhone		= $_POST['shipping_mobile_phone'];
//            $objPmReqCard->invoice->setShippingAddress($shippingAddress);

            #uncomment the line below in order to see the content of the request
            //echo "<pre>";print_r($objPmReqCard);echo "</pre>";
            $objPmReqCard->encrypt($app->getConfig('payment.mobilpay.certPath'));

            return Response::response(array(
                'url' => $app->getConfig('payment.mobilpay.paymentUrl'),
                'env_key' => $objPmReqCard->getEnvKey(),
                'data' => $objPmReqCard->getEncData(),
            ));

        } catch(Exception $e) {
            return Response::response500(array(
                'error' => 'Could not initiate Mobilpay Token',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ));
        }
    }

    /**
     * @param Application $app
     * @param Request $request
     * @return Response
     */
    public function braintree(Application $app, Request $request) {
        try {
            // decode load to obtain information
            $load = json_decode(base64_decode($request->get('load')));
            // init braintree setup
            $this->braintreeInit($app);

            $sale = [
                'amount' => $load->payment->totalEur,
                'orderId' => time(),
                'paymentMethodNonce' => $load->payment->payload->nonce,
                'options' => [
                    'submitForSettlement' => True
                ]
            ];
            $app->getLogger()->info(sprintf(
                'Braintree attempting sale info `%s`',
                json_encode($sale)
            ));

            // perform payment
            $result = Braintree\Transaction::sale($sale);
            if ($result instanceof \Braintree\Result\Error) {
                $app->getLogger()->err(sprintf(
                    'Braintree payment failed with token `%s`, nonce `%s`, result: `%s`.',
                    $load->payment->payload->token,
                    $load->payment->payload->nonce,
                    serialize($result)
                ));
                throw new \Exception('Could not complete Braintree transaction.');
            }

            $transaction = [
                'id' => $result->transaction->id,
                'type' => $result->transaction->type,
                'amount' => $result->transaction->amount,
                'status' => $result->transaction->status,
                'createdAt' => strtotime($result->transaction->createdAt),
                'cardEnding' => $result->transaction->creditCardDetails->last4,
                'token' => $load->payment->payload->token,
                'nonce' => $load->payment->payload->nonce,
            ];
            $app->getLogger()->info(sprintf(
                'Braintree sale `%s` succeded with transaction `%s`',
                json_encode($sale),
                json_encode($transaction)
            ));

            try {
                // save donation
                $id = $this->saveDonation($app, $load, $transaction);
                $app->getLogger()->info(sprintf(
                    'Braintree sale saved donation `%s`',
                    $id
                ));
            } catch (\Exception $e) {
                $app->getLogger()->err("{$e->getMessage()}\n{$e->getTraceAsString()}");
                throw $e;
            }

            return Response::response(array(
                'error' => 0,
                'result' => $result->success,
                'id' => $id,
                't' => $result->transaction->id,
            ));
        } catch (\Exception $e) {
            $app->getLogger()->err("{$e->getMessage()}\n{$e->getTraceAsString()}");
            return Response::response500(array(
                'error' => 'Could not complete payment.',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ));
        }
    }

    /**
     * @param Application $app
     * @param Request $request
     */
    public function mobilpayConfirm(Application $app, Request $request) {
        if($request->get('env_key') && $request->get('data'))
        {
            try {
                $objPmReq = \Mobilpay_Payment_Request_Abstract::factoryFromEncrypted(
                    $request->get('env_key'),
                    $request->get('env_key'),
                    $app->getConfig('payment.mobilpay.keyPath')
                );
                $errorCode = $objPmReq->objPmNotify->errorCode;

                if ($errorCode == "0") {
                    switch($objPmReq->objPmNotify->action) {
                        case 'confirmed':
                            #cand action este confirmed avem certitudinea ca banii au plecat din contul posesorului de card si facem update al starii comenzii si livrarea produsului
                            //update DB, SET status = "confirmed/captured"
                            $errorMessage = $objPmReq->objPmNotify->errorMessage;
                            break;
                        case 'confirmed_pending':
                            #cand action este confirmed_pending inseamna ca tranzactia este in curs de verificare antifrauda. Nu facem livrare/expediere. In urma trecerii de aceasta verificare se va primi o noua notificare pentru o actiune de confirmare sau anulare.
                            //update DB, SET status = "pending"
                            $errorMessage = $objPmReq->objPmNotify->errorMessage;
                            break;
                        case 'paid_pending':
                            #cand action este paid_pending inseamna ca tranzactia este in curs de verificare. Nu facem livrare/expediere. In urma trecerii de aceasta verificare se va primi o noua notificare pentru o actiune de confirmare sau anulare.
                            //update DB, SET status = "pending"
                            $errorMessage = $objPmReq->objPmNotify->errorMessage;
                            break;
                        case 'paid':
                            #cand action este paid inseamna ca tranzactia este in curs de procesare. Nu facem livrare/expediere. In urma trecerii de aceasta procesare se va primi o noua notificare pentru o actiune de confirmare sau anulare.
                            //update DB, SET status = "open/preauthorized"
                            $errorMessage = $objPmReq->objPmNotify->errorMessage;
                            break;
                        case 'canceled':
                            #cand action este canceled inseamna ca tranzactia este anulata. Nu facem livrare/expediere.
                            //update DB, SET status = "canceled"
                            $errorMessage = $objPmReq->objPmNotify->errorMessage;
                            break;
                        case 'credit':
                            #cand action este credit inseamna ca banii sunt returnati posesorului de card. Daca s-a facut deja livrare, aceasta trebuie oprita sau facut un reverse.
                            //update DB, SET status = "refunded"
                            $errorMessage = $objPmReq->objPmNotify->errorMessage;
                            break;
                        default:
                            $message = sprintf(
                                "Could not complete payment with mobilpay (err # %s / %s) :: mobilpay_refference_action paramaters is invalid",
                                \Mobilpay_Payment_Request_Abstract::CONFIRM_ERROR_TYPE_PERMANENT,
                                \Mobilpay_Payment_Request_Abstract::ERROR_CONFIRM_INVALID_ACTION
                            );
                            $app->getLogger()->err($message);
                            return Response::response500(array( 'error' => $message ));
                            break;
                    }
                } else {
                    //update DB, SET status = "rejected"
                    $errorMessage = $objPmReq->objPmNotify->errorMessage;
                }
            } catch(Exception $e) {
                $message = sprintf(
                    "Could not complete payment with mobilpay (err # %s).\n%s\n%s",
                    \Mobilpay_Payment_Request_Abstract::CONFIRM_ERROR_TYPE_TEMPORARY,
                    $e->getMessage(),
                    $e->getTraceAsString()
                );
                $app->getLogger()->err($message);
                return Response::response500(array(
                    'error' => $message,
                    'message' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                ));
            }
        } else {
            $message = sprintf(
                "Invalid confirm parameters (err #%s / #) :: mobilpay.ro posted invalid parameters",
                \Mobilpay_Payment_Request_Abstract::CONFIRM_ERROR_TYPE_PERMANENT,
                \Mobilpay_Payment_Request_Abstract::ERROR_CONFIRM_INVALID_POST_PARAMETERS
            );
            $app->getLogger()->err($message);
            return Response::response500(array( 'error' => $message ));
        }
    }

    /********************************************************
     * Private Declarations
     ********************************************************/

    /**
     * @method braintreeInit
     * @param  Application   $app
     */
    private function braintreeInit(Application $app) {
        Braintree\Configuration::environment($app->getConfig('payment.braintree.environment'));
        Braintree\Configuration::merchantId($app->getConfig('payment.braintree.merchantId'));
        Braintree\Configuration::publicKey($app->getConfig('payment.braintree.publicKey'));
        Braintree\Configuration::privateKey($app->getConfig('payment.braintree.privateKey'));
    }

    public function saveDonation(Application $app, $load, $transaction) {

        $donator = new Model\Donator([
            'name' => $load->name,
            'email' => $load->email,
            'company' => $load->company,
            'phone' => $load->phone,
            'location' => 'Romania',
            'locationgps' => '0;0',
            'companyvat' => $load->vat,
        ]);

        $app->getEm()->persist($donator);
        $app->getEm()->flush();

        $donation = new Model\Donation([
            'donation' => ($load->payment->currency === 'EUR') ? $load->payment->totalEur : $load->payment->total,
            'currency' => ($load->payment->currency === 'EUR') ? 'EUR' : 'RON',
            'exchange' => ($load->payment->currency === 'EUR') ? $load->payment->exchange : '',
            'trees' => 10, //$load->payment->trees,
            'started' => time(),
            'transactions' => json_encode($transaction),
            'donatorid' => $donator,
        ]);

        $app->getEm()->persist($donation);
        $app->getEm()->flush();

        return $donation->getId();
    }

}
