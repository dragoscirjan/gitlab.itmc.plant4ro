<?php

return array(
    'development' => [
        'payment' => [
            'braintree' => [
                'environment' =>'sandbox',
                'merchantId' => '89pcx4ss3kz8x5q7',
                'publicKey' => 'twp79qy2pg755nhz',
                'privateKey' => '7c97f0a849a5cba4bbbc8ad9b2fe578f',
            ],
            'mobilpay' => [
                'paymentUrl' => 'http://sandboxsecure.mobilpay.ro',
                'certPath' => __DIR__ . '/crt/mobilpay.cer',
                'keyPath' => __DIR__ . '/crt/mobilpay.key',
                'signature' => 'XXXX-XXXX-XXXX-XXXX-XXXX',
                'confirmUrl' => 'http://planteazapentruromania.local/services/index.php/donate/mobilepay-confirm',
                'returnUrl' => 'http://planteazapentruromania.local/#/plata-esuata',
            ],
            'debug' => [
                'dragos.cirjan+ppr@itmediaconnect.ro'
            ]
        ],
        'db' => array(
            'dbname' => 'donations',
            'user' => 'root',
            'password' => 'weltest',
            'host' => 'localhost',
            'driver' => 'pdo_mysql',
        ),
        'logger' => [
            ['stream', null, ['stream' => __DIR__ . '/.log']],
//            ['mail', null, ['dragos.cirjan+debug-ppr@itmediaconnect.ro', [
//                'name'              => 'localhost.localdomain',
//                'host'              => '127.0.0.1',
//                'connection_class'  => 'login',
//                'connection_config' => array(
//                    'username' => 'user',
//                    'password' => 'pass',
//                ),
//            ]]]
        ],
        'contact' => [
            'mail' => [
                'transport' => '\Zend\Mail\Transport\Smtp',
                'options' => [
                    'name' => 'localhost.localdomain',
                    'host' => '127.0.0.1',
                    'connection_class' => 'plain',
                    'connection_config' => [
                        'username' => 'user',
                        'password' => 'pass',
                    ],
                ],
            ],
            'to' => 'dragos.cirjan+debug-ppr@itmediaconnect.ro'
        ],
    ],
    'testing' => [],
    'staging' => [],
    'production' => [],
);