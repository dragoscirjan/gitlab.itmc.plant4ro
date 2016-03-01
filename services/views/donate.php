<?php

use Symfony\Component\HttpFoundation\Request;

require_once __DIR__ . '/../src/response.php';

return array(

    'get' => function(Request $request) {

        switch (strtolower($request->get('method'))) {
            case 'mobilpay':

            case 'braintree':

                \Braintree\Configuration::environment('sandbox');
                \Braintree\Configuration::merchantId('89pcx4ss3kz8x5q7');
                \Braintree\Configuration::publicKey('twp79qy2pg755nhz');
                \Braintree\Configuration::privateKey('7c97f0a849a5cba4bbbc8ad9b2fe578f');

                return response(array(
                    'error' => 0,
                    'action' => $request->get('action'),
                    'token' => \Braintree\ClientToken::generate(),
                ));

            case 'wire':
            default:
                return response500(array(
                    'error' => 'Invalid Payment Method',
                ));
        }

    }

);