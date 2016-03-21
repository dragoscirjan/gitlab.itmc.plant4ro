<?php

namespace Ppr\Mvc\Controller;

use Ppr\Application;
use Ppr\Http\Response;
use Ppr\Mvc\Model;

use Braintree;
use MarkWilson\XmlToJson\XmlToJsonConverter;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

class Donate {

    /********************************************************
     * Public Declarations
     ********************************************************/

    /**
     * Obtain exchange rate information from bnr.ro
     *
     * @param Application $app
     * @return Response
     */
    public function exchangeRate(Application $app) {
        try {
            // return information pulled from bnr.ro
            return Response::response(array(
                'error' => 0,
                'exchange' => (new XmlToJsonConverter())->asArray(
                    new \SimpleXMLElement(file_get_contents('http://www.bnr.ro/nbrfxrates.xml'))
                ),
            ));
        } catch(\Exception $e) {
            // log excepction
            $app->getLogger()->err(sprintf(
                "Failed pulling exchange rate with message: '%s', trace: \n %s",
                $e->getMessage(),
                $e->getTraceAsString()
            ));
            // respond with error
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
            // init braintree API
            $this->braintreeInit($app);
            // generate token
            $token = Braintree\ClientToken::generate();
            // log token
            $app->getLogger()->notice(sprintf(
                'Braintree token `%s` generated from `%s`',
                $token,
                $_SERVER['REMOTE_ADDR']
            ));
            // return token
            return Response::response(array(
                'error' => 0,
                'token' => $token,
            ));
        } catch (\Exception $e) {
            // log exception
            $app->getLogger()->err(sprintf(
                "Braintree token generation failed with message: '%s', trace: \n%s",
                $e->getMessage(),
                $e->getTraceAsString()
            ));
            // return exception
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

            // create mobilpay session
            srand((double) microtime() * 1000000);
            $mobilpay = new Model\Mobilpay([
                'uuid' => uniqid('PPR' . rand(), true),
                'hash' => $request->get('load'),
                'started' => time()
            ]);
            $app->getEm()->persist($mobilpay);
            $app->getEm()->flush();

            // create mobilpay api session
            $objPmReqCard = new \Mobilpay_Payment_Request_Card();
            $objPmReqCard->signature = $app->getConfig('payment.mobilpay.signature');
            $objPmReqCard->orderId = $mobilpay->getUuid();
            $objPmReqCard->confirmUrl = sprintf($app->getConfig('payment.mobilpay.confirmUrl'), $mobilpay->getUuid());
            $objPmReqCard->returnUrl = sprintf($app->getConfig('payment.mobilpay.returnUrl'), $mobilpay->getUuid());
            $objPmReqCard->invoice = new \Mobilpay_Payment_Invoice();
            $objPmReqCard->invoice->currency = 'RON';
            $objPmReqCard->invoice->amount = $load->donation->total;
            $objPmReqCard->invoice->details = 'Donatie cu card-ul prin mobilPay';
            $objPmReqCard->encrypt($app->getConfig('payment.mobilpay.certPath'));

            // return token
            return Response::response(array(
                'url' => $app->getConfig('payment.mobilpay.paymentUrl'),
                'env_key' => $objPmReqCard->getEnvKey(),
                'data' => $objPmReqCard->getEncData(),
            ));
        } catch(Exception $e) {
            // log exception
            $app->getLogger()->err(sprintf(
                "Mobilpay token generation failed with message: '%s', trace: \n%s",
                $e->getMessage(),
                $e->getTraceAsString()
            ));
            // return exception
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

            // create sale data
            $sale = [
                'amount' => $load->donation->totalEur,
                'orderId' => time(),
                'paymentMethodNonce' => $load->donation->braintree->nonce,
                'options' => [
                    'submitForSettlement' => True
                ]
            ];

            // log sale attempt
            $app->getLogger()->info(sprintf(
                'Braintree attempting sale info `%s`',
                json_encode($sale)
            ));

            // perform payment
            $result = Braintree\Transaction::sale($sale);

            // if error
            if ($result instanceof \Braintree\Result\Error) {
                // log error
                $app->getLogger()->alert(sprintf(
                    "Braintree payment failed with \ntoken: `%s`, \nnonce: `%s`, \nresult: `%s`, \nrequest: `%s`.",
                    $load->donation->braintree->token,
                    $load->donation->braintree->nonce,
                    serialize($result),
                    $request->get('load')
                ));
                // throw exception
                throw new \Exception('Could not complete Braintree transaction.');
            }

            // else create transaction info
            $transaction = [
                'id' => $result->transaction->id,
                'type' => $result->transaction->type,
                'amount' => $result->transaction->amount,
                'status' => $result->transaction->status,
                'createdAt' => strtotime($result->transaction->createdAt),
                'cardEnding' => $result->transaction->creditCardDetails->last4,
                'token' => $load->donation->braintree->token,
                'nonce' => $load->donation->braintree->nonce,
            ];

            // log transaction
            $app->getLogger()->info(sprintf(
                'Braintree sale `%s` succeded with transaction `%s`',
                json_encode($sale),
                json_encode($transaction)
            ));

            // save donation
            $id = $this->saveDonation($app, $load, $transaction);

            // return sale response
            return Response::response(array(
                'error' => 0,
                'result' => $result->success,
                'id' => $id,
                't' => $result->transaction->id,
            ));
        } catch (\Exception $e) {
            // log exception
            $app->getLogger()->err(sprintf(
                "Braintree sale attempt failed: '%s', trace: \n%s",
                $e->getMessage(),
                $e->getTraceAsString()
            ));
            // return exception
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
    public function mobilpay(Application $app, Request $request) {

        // treat mobilpay payment fail redirect
        if ($request->get('status') !== 'confirm') {
            try {
                // obtain mobilpay session info
                $mobilpay = $app->getEm()->createQuery(sprintf(
                    "SELECT m FROM \Ppr\Mvc\Model\Mobilpay m WHERE m.uuid = '%s'",
                    $request->get('orderId')
                ))->execute()[0];
                // log error
                $app->getLogger()->alert(sprintf(
                    'Mobilpay returned payment fail for the following email %s and hash %s',
                    json_decode(base64_decode($mobilpay->getHash()))->email,
                    $mobilpay->getHash()
                ));
                // remove session
//                $app->getEm()->remove($mobilpay);
//                $app->getEm()->flush();
                // redirect
                return $app->redirect('/#/planteaza/plata-esuata');
            } catch (\Exception $e) {
                // TODO: $app->redirect('/services/index.php/500', Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }

        // TODO: Could not create a successful payment for Mobilpay yet.
        if($request->get('env_key') && $request->get('data')) {
            try {
                $objPmReq = \Mobilpay_Payment_Request_Abstract::factoryFromEncrypted(
                    $request->get('env_key'),
                    $request->get('data'),
                    $app->getConfig('payment.mobilpay.keyPath')
                );
                $errorCode = $objPmReq->objPmNotify->errorCode;

                echo json_encode($objPmReq->objPmNotify); 
                die(var_dump($objPmReq->objPmNotify));

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

    /**
     * @param Application $app
     * @param $load
     * @param $transaction
     * @return mixed
     * @throws \Exception
     */
    private function saveDonation(Application $app, $load, $transaction) {
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
            'donation' => ($load->donation->method=== 'braintree') ? $load->donation->totalEur : $load->donation->total,
            'currency' => ($load->donation->method=== 'braintree') ? 'EUR' : 'RON',
            'exchange' => ($load->donation->method=== 'braintree') ? $load->donation->exchange : '',
            'trees' => 10, //$load->payment->trees,
            'started' => time(),
            'transactions' => json_encode($transaction),
            'donatorid' => $donator,
        ]);

        $app->getEm()->persist($donation);
        $app->getEm()->flush();

        $app->getLogger()->info(sprintf(
            'Braintree sale saved donation `%s`',
            $donation->getId()
        ));

        return $donation->getId();
    }

}
