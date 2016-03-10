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
                'paymentUrl' => 'http://sandboxsecure.mobilpay.ro/card3',
                'certPath' => __DIR__ . '/cert/live.UQUX-6E8G-G8TG-B88U-N9UG.public.cer',
                'keyPath' => __DIR__ . '/cert/live.UQUX-6E8G-G8TG-B88U-N9UG.public.key',
                'signature' => 'UQUX-6E8G-G8TG-B88U-N9UG',
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
                    'name' => 'mail.itmediaconnect.ro',
                    'host' => 'mail.itmediaconnect.ro',
                    'port' => 587,
                    'connection_class' => 'plain',
                    'connection_config' => [
                        'username' => 'dr@itmcd.ro',
                        'password' => 'strumph##',
                        'ssl' => 'tls',
                    ],
                ],
            ],
            'from' => ['noreply@itmcd.ro', 'Planteaza pentru Romania Contact'],
            'to' => ['dragos.cirjan+debug-ppr@itmediaconnect.ro', 'Dragos Cirjan']
        ],
    ],
    'testing' => [
        'payment' => [
            'mobilpay' => [
                'paymentUrl' => 'http://secure.mobilpay.ro/card3',
                'confirmUrl' => 'https://20150315.planteazapentruromania.ro/services/index.php/donate/mobilepay-confirm',
                'returnUrl' => 'http:s//20150315.planteazapentruromania.ro/#/plata-esuata',
            ]
        ],
    ],
    'staging' => [
        'payment' => [
            'mobilpay' => [
                'paymentUrl' => 'http://secure.mobilpay.ro/card3',
                'confirmUrl' => 'https://stage.planteazapentruromania.local/services/index.php/donate/mobilepay-confirm',
                'returnUrl' => 'https://stage.planteazapentruromania.local/#/plata-esuata',
            ]
        ],
    ],
    'production' => [
        'payment' => [
            'mobilpay' => [
                'paymentUrl' => 'http://secure.mobilpay.ro/card3',
                'confirmUrl' => 'https://planteazapentruromania.ro/services/index.php/donate/mobilepay-confirm',
                'returnUrl' => 'https://planteazapentruromania.ro/#/plata-esuata',
            ]
        ],
    ],
);