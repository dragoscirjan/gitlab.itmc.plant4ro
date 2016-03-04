<?php

use Symfony\Component\HttpFoundation\Request;

require_once __DIR__ . '/../src/response.php';

/**
 * @return string
 */
function braintreeMerchantId() {
    return '89pcx4ss3kz8x5q7';
}

/**
 *
 */
function braintreeSetup() {
    \Braintree\Configuration::environment('sandbox');
    \Braintree\Configuration::merchantId(braintreeMerchantId());
    \Braintree\Configuration::publicKey('twp79qy2pg755nhz');
    \Braintree\Configuration::privateKey('7c97f0a849a5cba4bbbc8ad9b2fe578f');
}

/**
 * @return string
 */
function braintreeClientToken() {
    braintreeSetup();
    return \Braintree\ClientToken::generate();
}

return array(

    'get' => function(Request $request) {

        switch (strtolower($request->get('method'))) {
            case 'mobilpay':

            case 'braintree':
                return response(array(
                    'error' => 0,
                    'action' => $request->get('action'),
                    'token' => braintreeClientToken(),
                ));

            case 'wire':
            default:
                return response500(array(
                    'error' => 'Invalid Payment Method',
                ));
        }

    },

    'post' => function(Request $request) {
        if ($request->get('method') == 'braintree') {
            $load = json_decode(base64_decode($request->get('load')));

//            echo json_encode($load); die();

            braintreeSetup();

            $result = \Braintree\Transaction::sale([
                'amount' => $load->payment->totalEur,
                'orderId' => time(),
                'paymentMethodNonce' => $load->payment->payload->nonce,
//                'merchantAccountId' => braintreeMerchantId(),
//                'customer' => [
//                    'firstName' => $load->name,
//                    'lastName' => $load->name,
////                    'company' => $load->company,
////                    'phone' => $load->phone,
//                    'email' => $load->email
//                ],
//                'billing' => [
//                    'firstName' => $load->name,
//                    'lastName' => $load->name,
////                    'company' => 'Braintree',
////                    'streetAddress' => '1 E Main St',
////                    'extendedAddress' => 'Suite 403',
////                    'locality' => 'Chicago',
////                    'region' => 'IL',
////                    'postalCode' => '60622',
////                    'countryCodeAlpha2' => 'US'
//                ],
                'options' => [
                    'submitForSettlement' => True
                ]
            ]);

            echo json_encode($result); die();
        }
    }

);