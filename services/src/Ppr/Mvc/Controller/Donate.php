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
