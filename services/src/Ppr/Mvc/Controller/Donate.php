<?php

namespace Ppr\Mvc\Controller;

use MyProject\Proxies\__CG__\stdClass;
use Ppr\Application;
use Ppr\Http\Response;
use Ppr\Mvc\Model;

use Braintree;
use MarkWilson\XmlToJson\XmlToJsonConverter;
use Mobilpay_Payment_Request_Abstract as MPRA;
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
                '(Donation/Braintree) :: Token `%s` generated from `%s`',
                $token,
                $_SERVER['REMOTE_ADDR']
            ));
            // return token
            return Response::response(array(
                'error' => 0,
                'token' => $token,
            ));
        } catch (\Exception $e) {
            // return exception
            return Response::response500([
                'error' => '(Donation/Braintree) :: FAIL Could not initiate Braintree Token',
                'e' => $e,
            ]);
        }
    }

    /**
     * @param Application $app
     */
    public function mobilpayClientToken(Application $app, Request $request) {
        // decode load to obtain information
        $load = $app->decode($request->get('load'));
        $orderId = $this->uuid();
        try {
            // save donator
            $donator = $this->getDonatorByEmail($app, $load->email, $load);
            // save donation (this will enter with 'STATUS_PENDING')
            $donation = $this->getDonationByUuid($app, $orderId, $donator, $load);
        } catch (\Exception $e) {
            // return exception
            return Response::response500([
                'error' => '(Donation/Mobilpay) :: FAIL Could not save initial payment data',
                'e' => $e,
            ], $app);
        }
        try {
            // create mobilpay api session
            $objPmReqCard = new \Mobilpay_Payment_Request_Card();
            $objPmReqCard->signature = $app->getConfig('payment.mobilpay.signature');
            $objPmReqCard->orderId = $orderId;
            $objPmReqCard->confirmUrl = sprintf($app->getConfig('payment.mobilpay.confirmUrl'), $orderId);
            $objPmReqCard->returnUrl = sprintf($app->getConfig('payment.mobilpay.returnUrl'), $orderId);
            $objPmReqCard->invoice = new \Mobilpay_Payment_Invoice();
            $objPmReqCard->invoice->currency = 'RON';
            $objPmReqCard->invoice->amount = $load->donation->total;
            $objPmReqCard->invoice->details = 'Donatie cu card-ul prin mobilPay';
            $objPmReqCard->encrypt($app->getConfig('payment.mobilpay.certPath'));
            // log token
            $app->getLogger()->notice(sprintf(
                '(Donation/Mobilpay) :: Env_key `%s`, data `%s`, generated from `%s`',
                $objPmReqCard->getEnvKey(),
                $objPmReqCard->getEncData(),
                $_SERVER['REMOTE_ADDR']
            ));
            // return token
            return Response::response(array(
                'error' => 0,
                'url' => $app->getConfig('payment.mobilpay.paymentUrl'),
                'env_key' => $objPmReqCard->getEnvKey(),
                'data' => $objPmReqCard->getEncData(),
            ));
        } catch(\Exception $e) {
            // return exception
            return Response::response500(array(
                'error' => '(Donation/Mobilpay) :: Mobilpay token generation failed',
                'e' => $e,
            ));
        }
    }

    /**
     * @param Application $app
     * @param Request $request
     * @return Response
     */
    public function braintree(Application $app, Request $request) {
        // decode load to obtain information
        $load = $app->decode($request->get('load'));
        // create sale data
        $sale = [
            'amount' => $load->donation->totalEur,
            'orderId' => $this->uuid(),
            'paymentMethodNonce' => $load->donation->braintree->nonce,
            'options' => [
                'submitForSettlement' => True
            ]
        ];
        try {
            // save donator
            $donator = $this->getDonatorByEmail($app, $load->email, $load);
            // save donation (this will enter with 'STATUS_PENDING')
            $donation = $this->getDonationByUuid($app, $sale['orderId'], $donator, $load);
        } catch (\Exception $e) {
            // return exception
            return Response::response500([
                'error' => '(Donation/Braintree) :: FAIL Could not save initial payment data',
                'e' => $e,
            ], $app);
        }
        // init transaction info
        $transaction = [];
        // try to perform donation payment
        try {
            // init braintree setup
            $this->braintreeInit($app);
            // log sale attempt
            $app->getLogger()->info(sprintf('(Donation/Braintree) :: Braintree attempting sale info: %s', json_encode($sale)));
            // perform payment
            $result = Braintree\Transaction::sale($sale);
            // if error
            if ($result instanceof Braintree\Result\Error) {
                // log error
                $app->getLogger()->alert(sprintf(
                    "(Donation/Braintree) :: FAIL : Payment failed for \ntoken: `%s`, \nnonce: `%s`, \nresult: `%s`, \nrequest: `%s`.",
                    $load->donation->braintree->token,
                    $load->donation->braintree->nonce,
                    serialize($result),
                    $request->get('load')
                ));
                // change donation status to STATUS_FAILED
                $this->setDonationStatus($app, $donation, Model\Donation::STATUS_FAILED);
                // throw exception
                throw new Braintree\Exception('(Donation/Braintree) :: FAIL : Could not complete Braintree transaction.');
            }

            // else create transaction info
            $transaction = [
                'id' => $result->transaction->id,
                'type' => $result->transaction->type,
                'amount' => $result->transaction->amount,
                'status' => $result->transaction->status,
                'createdAt' => time(),
                'cardEnding' => $result->transaction->creditCardDetails->last4,
                'orderId' => $result->transaction->orderId,
            ];

            // append hash info
            $hash = $app->decode($donation->getHash());
            $hash[] = $transaction;
            $donation->setHash($app->encode($hash));
            // change status to STATUS_COMPLETED*
            if ($load->annonymous) {
                $this->setDonationStatus($app, $donation, Model\Donation::STATUS_COMPLETED_ANNO);
            } else {
                $this->setDonationStatus($app, $donation, Model\Donation::STATUS_COMPLETED);
            }

            // log transaction
            $app->getLogger()->info(sprintf(
                '(Donation/Braintree) :: SUCCESS : Sale `%s` succeded with transaction `%s`',
                json_encode($sale),
                json_encode($transaction)
            ));
        } catch (Braintree\Exception $e) {
            // return exception
            return Response::response500(array(
                'error' => 'Could not complete payment.',
                'e' => $e,
            ), $app);
        } catch (\Exception $e) {
            // return exception
            return Response::response500(array(
                'error' => 'Error occured on payment.',
                'e' => $e,
            ), $app);
        }

        // return sale response
        return Response::response(array(
            'error' => 0,
            'result' => $result->success,
            'id' => $donation->getId(),
            't' => $sale['orderId'],
        ));
    }

    /**
     * @param Application $app
     * @param Request $request
     */
    public function mobilpay(Application $app, Request $request) {
        try {
            $donation = $this->getDonationByUuid($app, $request->get('orderId'));
        } catch (\Exception $e) {
            // return exception
            return Response::response500([
                'error' => '(Donation/Mobilpay) :: FAIL Could not load initial payment data',
                'e' => $e,
            ], $app);
        }

        /**
         * Info Section
         */
        if ($request->get('status') === 'info') {
            $donation = $donation->toArray();
            $donation['hash'] = $app->decode($donation['hash']);
            return new Response($app->encode($donation));
        }

        /**
         * Validation Section
         */

        // treat mobilpay payment fail redirect
        if ($request->get('status') === 'return') {
            try {
                $load = array_shift($app->decode($donation->getHash()));
                $transaction = array_pop($app->decode($donation->getHash()));
                // if not session info throw error
                if (!isset($transaction->objPmNotify)) {
                    // log error
                    $app->getLogger()->alert(sprintf(
                        '(Donation/Mobilpay) :: FAIL : Failed attepmt to validate orderId: %s',
                        $request->get('orderId')
                    ));
                    // set donation status to FAILED
                    $this->setDonationStatus($app, $donation, Model\Donation::STATUS_FAILED);
                    // redirect
                    return $app->redirect(sprintf('/#/planteaza/%s/esuat', $request->get('orderId')));
                }

                // if last session is not a payment session or has error code, throw error
                if ($transaction->objPmNotify->errorCode != 0) {
                    // log error
                    $app->getLogger()->alert(sprintf(
                        '(Donation/Mobilpay) :: FAIL : Mobilpay returned payment fail with the following hash: %s',
                        json_encode($transaction)
                    ));
                    // set donation status to FAILED
                    $this->setDonationStatus($app, $donation, Model\Donation::STATUS_FAILED);
                    // redirect
                    return $app->redirect(sprintf('/#/planteaza/%s/esuat', $request->get('orderId')));
                }
                switch($transaction->objPmNotify->action) {
                    // if payment is successful
                    case 'confirmed':
                    case 'confirmed_pending':
                    case 'paid_pending':
                    case 'paid':
                    case 'canceled':
                    case 'credit':
                        // set donation status to COMPLETED*
                        if ($load->annonymous) {
                            $this->setDonationStatus($app, $donation, Model\Donation::STATUS_COMPLETED_ANNO);
                        } else {
                            $this->setDonationStatus($app, $donation, Model\Donation::STATUS_COMPLETED);
                        }
                        // redirect
                        return $app->redirect(sprintf('/#/diploma/%s/%s/preview', $donation->getId(), $donation->getUuid()));
                    default:
                        // log error
                        $app->getLogger()->alert(sprintf(
                            '(Donation/Mobilpay) :: FAIL : Mobilpay returned payment fail with the following hash: %s',
                            json_encode($transaction)
                        ));
                        // set donation status to FAILED
                        $this->setDonationStatus($app, $donation, Model\Donation::STATUS_FAILED);
                        // redirect
                        return $app->redirect(sprintf('/#/planteaza/%s/esuat', $request->get('orderId')));
                }
            } catch (\Exception $e) {
                // log error
                $app->getLogger()->alert(sprintf(
                    "(Donation/Mobilpay) :: FAIL : Mobilpay payment validation failed with message: `%s`, trace: \n`%s`.",
                    $e->getMessage(),
                    $e->getTraceAsString()
                ));
                // set donation status to FAILED
                $this->setDonationStatus($app, $donation, Model\Donation::STATUS_FAILED);
                // redirect
                return $app->redirect(sprintf('/#/planteaza/%s/esuat', $request->get('orderId')));
            }
        }

        /**
         * Confirmation Section
         */

        // Default error values
        $errorCode 		= 0;
        $errorType		= MPRA::CONFIRM_ERROR_TYPE_NONE;
        $errorMessage	= '';

        // check whether the HTTP method is POST
        if (strtolower($request->getMethod()) == 'post') {
            // check if `env_key` and `data` are set
            if($request->get('env_key') && $request->get('data')) {
                try {
                    // try to build the resoponse object
                    $objPmReq = MPRA::factoryFromEncrypted(
                        $request->get('env_key'),
                        $request->get('data'),
                        $app->getConfig('payment.mobilpay.keyPath')
                    );

                    $hash = $app->decode($donation->getHash());
                    $hash[] = $objPmReq;
                    $donation->setHash($app->encode($hash));
                    $app->getEm()->merge($donation);
                    $app->getEm()->flush();

                    if ($objPmReq->objPmNotify->errorCode == 0) {
                        switch($objPmReq->objPmNotify->action) {
                            case 'confirmed':
                            case 'confirmed_pending':
                            case 'paid_pending':
                            case 'paid':
                            case 'canceled':
                            case 'credit':
                                return new Response(
                                    sprintf(
                                        '<?xml version="1.0" encoding="utf-8"?><crc>%s</crc>',
                                        $objPmReq->objPmNotify->errorMessage
                                    ),
                                    Response::HTTP_OK,
                                    ['Content-type' => 'application/xml']
                                );
                                break;
                            default:
                                // in case payment parameters are invalid
                                $errorType		= MPRA::CONFIRM_ERROR_TYPE_PERMANENT;
                                $errorCode 		= MPRA::ERROR_CONFIRM_INVALID_ACTION;
                                $errorMessage 	= 'mobilpay_refference_action paramaters is invalid';
                        }
                    } else {
                        // in case payment was rejected
                        $errorMessage = $objPmReq->objPmNotify->errorMessage;
                    }
                } catch(\Exception $e) {
                    // in case response object fails ...
                    $errorType 		= MPRA::CONFIRM_ERROR_TYPE_TEMPORARY;
                    $errorCode		= $e->getCode();
                    $errorMessage 	= $e->getMessage();
                }
            } else {
                // in case `env_key` or `data` are not set
                $errorType = MPRA::CONFIRM_ERROR_TYPE_PERMANENT;
                $errorCode = MPRA::ERROR_CONFIRM_INVALID_POST_PARAMETERS;
                $errorMessage = 'mobilpay.ro posted invalid parameters';
            }
        } else {
            // in case POST method not used
            $errorType = MPRA::CONFIRM_ERROR_TYPE_PERMANENT;
            $errorCode = MPRA::ERROR_CONFIRM_INVALID_POST_METHOD;
            $errorMessage = 'invalid request metod for payment confirmation';
        }

        $message = sprintf(
            "Error on mobiplay confirm: %s, type: %s, code: %s, \nlog: %s",
            $errorMessage,
            $errorType,
            $errorCode,
            json_encode(isset($objPmReq->objPmNotify) ? $objPmReq->objPmNotify : '')
        );
        $app->getLogger()->err($message);

        return new Response(
            sprintf(
                '<?xml version="1.0" encoding="utf-8"?><crc error_type="%s" error_code="%s">%s</crc>',
                $errorType,
                $errorCode,
                $errorMessage
            ),
            Response::HTTP_OK,
            ['Content-type' => 'application/xml']
        );
    }

    /**
     * @param Application $app
     * @param Request $request
     * @return Response
     */
    public function info(Application $app, Request $request) {
        try {

            $donation = $this->getDonationByUuid($app, $request->get('orderId'));
            $donation = $donation->toArray();
            $donation['hash'] = $app->decode($donation['hash']);

            $donator = $app->getEm()->getRepository('\Ppr\Mvc\Model\Donator')->find($donation['donator']['id']);
            $donation['donator'] = [
                'name' => $donator->getName(),
                'company' => $donator->getCompany()
            ];

            return new Response($app->encode($donation));
        } catch (\Exception $e) {
            // return exception
            return Response::response500([
                'error' => '(Donation/Info) :: FAIL Error interrogating database.',
                'e' => $e,
            ], $app);
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
     * @param string $uuid
     * @return array
     */
    private function getMobilpayLog(Application $app, $uuid) {
        return $app->getEm()->createQuery(sprintf(
            "SELECT m FROM \Ppr\Mvc\Model\Mobilpay m WHERE m.uuid = '%s' ORDER BY m.id DESC",
            $uuid
        ))->execute();
    }

    /**
     *
     * @param Application $app
     * @param string $email
     * @param \stdClass|null $load
     * @return \Ppr\Mvc\Model\Donator|null
     */
    private function getDonatorByEmail(Application $app, $email, $load = null) {
        // obtain entity manager
        $em = $app->getEm();
        // check if donator already exists (by email)
        $donator = $em->createQuery(sprintf(
            "SELECT d FROM \Ppr\Mvc\Model\Donator d WHERE d.email = '%s'",
            $email
        ))->getResult();
        // if donator doesn't exists
        if (empty($donator)) {
            // and if load is empty
            if (empty($load)) {
                // just ... leave
                return null;
            }
            // create donator (for the 1st time)
            $donator = new Model\Donator([
                'name' => $load->name,
                'email' => $load->email,
                'company' => $load->company,
                'phone' => $load->phone,
                'location' => 'Romania',
                'locationgps' => $load->locationGps,
                'companyvat' => $load->vat,
            ]);
            $em->persist($donator);
            $em->flush();
            $app->getLogger()->info(sprintf("Donator created: %s", $donator));
        } else {
            $donator = array_pop($donator);
            $app->getLogger()->info(sprintf("Donator discovered by email: %s, \n%s", $email, $donator));
        }
        return $donator;
    }

    /**
     * @param Application $app
     * @param string $uuid
     * @param \stdClass|null $load
     * @return \Ppr\Mvc\Model\Donation|null
     */
    private function getDonationByUuid(Application $app, $uuid, $donator = null, $load = null) {
        // obtain entity manager
        $em = $app->getEm();
        // check if donation already exists (by uuid)
        $donation = $em->createQuery(sprintf(
            "SELECT d FROM \Ppr\Mvc\Model\Donation d WHERE d.uuid = '%s'",
            $uuid
        ))->getResult();
        // if donator doesn't exists
        if (empty($donation)) {
            // and if load is empty
            if (empty($load)) {
                // just ... leave
                return null;
            }
            // create donator (for the 1st time)
            $donation = new Model\Donation([
                'donation' => ($load->donation->method=== 'braintree') ? $load->donation->totalEur : $load->donation->total,
                'currency' => ($load->donation->method=== 'braintree') ? 'EUR' : 'RON',
                'exchange' => ($load->donation->method=== 'braintree') ? $load->donation->exchange : '',
                'trees' => $load->trees,
                'uuid' => $uuid,
                'status' => Model\Donation::STATUS_PENDING,
                'hash' => $app->encode([$load]),
                'hashMethod' => $app->encodeMethod(),
                'donator' => $donator,
            ]);
            $em->persist($donation);
            $em->flush();
            $app->getLogger()->info(sprintf('Donation created: %s', $donation));
        } else {
            $donation = array_pop($donation);
            $app->getLogger()->info(sprintf("Donation discovered by uuid: %s, \n%s", $uuid, $donation));
        }
        return $donation;
    }

    /**
     * @param Application $app
     * @param Model\Donation $donation
     * @param int $status
     * @return Model\Donation
     * @throws \Exception
     */
    private function setDonationStatus(Application $app, Model\Donation $donation, $status = Model\Donation::STATUS_PENDING) {
        $donation->setStatus($status);
        $app->getEm()->merge($donation);
        $app->getEm()->flush();
        return $donation;
    }

//    /**
//     * @param Application $app
//     * @param $load
//     * @param $transaction
//     * @return mixed
//     * @throws \Exception
//     */
//    private function saveDonation(Application $app, $load, $transaction) {
//
//        // create or obtain donator
//        $donator = $this->getDonatorByEmail($app, $load->email, $load);
//
//        $app->getLogger()->info(sprintf(
//            'Braintree sale saved donation `%s`',
//            $donation->getId()
//        ));
//
//        return $donation->getId();
//    }

    /**
     * @return string
     */
    private function uuid() {
        srand((double) microtime() * 1000000);
        return uniqid('PPR' . rand(), true);
    }

//    private function test() {
//        $errorCode = 0;
//        $errorType = MPRA::CONFIRM_ERROR_TYPE_NONE;
//        $errorMessage = '';
//
//        if (strcasecmp($_SERVER['REQUEST_METHOD'], 'post') == 0)
//        {
//            if(isset($_POST['env_key']) && isset($_POST['data']))
//            {
//                #calea catre cheia privata
//                #cheia privata este generata de mobilpay, accesibil in Admin -> Conturi de comerciant -> Detalii -> Setari securitate
//                $privateKeyFilePath = 'i.e: /home/certificates/private.key';
//
//                try
//                {
//                    $objPmReq = MPRA::factoryFromEncrypted($_POST['env_key'], $_POST['data'], $privateKeyFilePath);
//                    #uncomment the line below in order to see the content of the request
//                    //print_r($objPmReq);
//                    $errorCode = $objPmReq->objPmNotify->errorCode;
//                    // action = status only if the associated error code is zero
//                    if ($errorCode == "0") {
//                        switch($objPmReq->objPmNotify->action)
//                        {
//                            #orice action este insotit de un cod de eroare si de un mesaj de eroare. Acestea pot fi citite folosind $cod_eroare = $objPmReq->objPmNotify->errorCode; respectiv $mesaj_eroare = $objPmReq->objPmNotify->errorMessage;
//                            #pentru a identifica ID-ul comenzii pentru care primim rezultatul platii folosim $id_comanda = $objPmReq->orderId;
//                            case 'confirmed':
//                                #cand action este confirmed avem certitudinea ca banii au plecat din contul posesorului de card si facem update al starii comenzii si livrarea produsului
//                                //update DB, SET status = "confirmed/captured"
//                                $errorMessage = $objPmReq->objPmNotify->errorMessage;
//                                break;
//                            case 'confirmed_pending':
//                                #cand action este confirmed_pending inseamna ca tranzactia este in curs de verificare antifrauda. Nu facem livrare/expediere. In urma trecerii de aceasta verificare se va primi o noua notificare pentru o actiune de confirmare sau anulare.
//                                //update DB, SET status = "pending"
//                                $errorMessage = $objPmReq->objPmNotify->errorMessage;
//                                break;
//                            case 'paid_pending':
//                                #cand action este paid_pending inseamna ca tranzactia este in curs de verificare. Nu facem livrare/expediere. In urma trecerii de aceasta verificare se va primi o noua notificare pentru o actiune de confirmare sau anulare.
//                                //update DB, SET status = "pending"
//                                $errorMessage = $objPmReq->objPmNotify->errorMessage;
//                                break;
//                            case 'paid':
//                                #cand action este paid inseamna ca tranzactia este in curs de procesare. Nu facem livrare/expediere. In urma trecerii de aceasta procesare se va primi o noua notificare pentru o actiune de confirmare sau anulare.
//                                //update DB, SET status = "open/preauthorized"
//                                $errorMessage = $objPmReq->objPmNotify->errorMessage;
//                                break;
//                            case 'canceled':
//                                #cand action este canceled inseamna ca tranzactia este anulata. Nu facem livrare/expediere.
//                                //update DB, SET status = "canceled"
//                                $errorMessage = $objPmReq->objPmNotify->errorMessage;
//                                break;
//                            case 'credit':
//                                #cand action este credit inseamna ca banii sunt returnati posesorului de card. Daca s-a facut deja livrare, aceasta trebuie oprita sau facut un reverse.
//                                //update DB, SET status = "refunded"
//                                $errorMessage = $objPmReq->objPmNotify->errorMessage;
//                                break;
//                            default:
//                                $errorType		= MPRA::CONFIRM_ERROR_TYPE_PERMANENT;
//                                $errorCode 		= MPRA::ERROR_CONFIRM_INVALID_ACTION;
//                                $errorMessage 	= 'mobilpay_refference_action paramaters is invalid';
//                                break;
//                        }
//                    }
//                    else {
//                        //update DB, SET status = "rejected"
//                        $errorMessage = $objPmReq->objPmNotify->errorMessage;
//                    }
//                }
//                catch(Exception $e)
//                {
//                    $errorType 		= MPRA::CONFIRM_ERROR_TYPE_TEMPORARY;
//                    $errorCode		= $e->getCode();
//                    $errorMessage 	= $e->getMessage();
//                }
//            }
//            else
//            {
//                $errorType 		= MPRA::CONFIRM_ERROR_TYPE_PERMANENT;
//                $errorCode		= MPRA::ERROR_CONFIRM_INVALID_POST_PARAMETERS;
//                $errorMessage 	= 'mobilpay.ro posted invalid parameters';
//            }
//        }
//        else
//        {
//            $errorType 		= MPRA::CONFIRM_ERROR_TYPE_PERMANENT;
//            $errorCode		= MPRA::ERROR_CONFIRM_INVALID_POST_METHOD;
//            $errorMessage 	= 'invalid request metod for payment confirmation';
//        }
//
//        header('Content-type: application/xml');
//        if($errorCode == 0)
//        {
//            echo "<crc>{$errorMessage}</crc>";
//        }
//        else
//        {
//            echo "<crc error_type=\"{$errorType}\" error_code=\"{$errorCode}\">{$errorMessage}</crc>";
//        }
//    }

}
