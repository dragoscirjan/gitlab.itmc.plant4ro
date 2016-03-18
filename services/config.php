<?php

return array(
    'development' => [
        'db' => array(
            'dbname' => 'donations',
            'user' => 'root',
            'password' => 'weltest',
            'host' => 'localhost',
            'driver' => 'pdo_mysql',
        ),
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
        'js' => [
            'servicesBase' => '//planteazapentruromania.local/services/index.php/'
        ],
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
        'payment' => [
            'braintree' => [
                'environment' =>'sandbox',
                'merchantId' => '89pcx4ss3kz8x5q7',
                'publicKey' => 'twp79qy2pg755nhz',
                'privateKey' => '7c97f0a849a5cba4bbbc8ad9b2fe578f',
            ],
            'mobilpay' => [
                'paymentUrl' => 'http://sandboxsecure.mobilpay.ro',
//                'paymentUrl' => 'http://sandboxsecure.mobilpay.ro/card3',
                'certPath' => __DIR__ . '/cert/sandbox.UQUX-6E8G-G8TG-B88U-N9UG.public.cer',
                'keyPath' => __DIR__ . '/cert/sandbox.UQUX-6E8G-G8TG-B88U-N9UGprivate.key',
                'signature' => 'UQUX-6E8G-G8TG-B88U-N9UG',
                'confirmUrl' => 'http://planteazapentruromania.local/services/index.php/donate/mobilpay/%s/confirm',
                'returnUrl' => 'http://planteazapentruromania.local/services/index.php/donate/mobilpay/%s/fail',
            ],
            'debug' => [
                'dragos.cirjan+ppr@itmediaconnect.ro'
            ]
        ],
    ],
    'testing' => [
        'db' => array(
            'dbname' => 'plant4ro_test_do',
            'user' => 'plant4ro',
            'password' => 'plant4roma',
            'host' => 'localhost',
            'driver' => 'pdo_mysql',
        ),
        'js' => [
            'servicesBase' => '//test.planteazapentruromania.ro/services/index.php/'
        ],
        'payment' => [
            'mobilpay' => [
                'confirmUrl' => 'https://test.planteazapentruromania.ro/services/index.php/donate/mobilpay/%s/confirm',
                'returnUrl' => 'https://test.planteazapentruromania.ro/services/index.php/donate/mobilpay/%s/fail',
            ]
        ],
    ],
    'staging' => [
        'db' => array(
            'dbname' => 'plant4ro_stage_do',
            'user' => 'plant4ro',
            'password' => 'plant4roma',
            'host' => 'localhost',
            'driver' => 'pdo_mysql',
        ),
        'js' => [
            'servicesBase' => '//stage.planteazapentruromania.ro/services/index.php/'
        ],
        'payment' => [
            'mobilpay' => [
                'paymentUrl' => 'http://secure.mobilpay.ro',
                'certPath' => __DIR__ . '/cert/live.UQUX-6E8G-G8TG-B88U-N9UG.public.cer',
                'keyPath' => __DIR__ . '/cert/live.UQUX-6E8G-G8TG-B88U-N9UG.public.key',
                'signature' => 'UQUX-6E8G-G8TG-B88U-N9UG',
                'confirmUrl' => 'https://stage.planteazapentruromania.ro/services/index.php/donate/mobilpay/%s/confirm',
                'returnUrl' => 'https://stage.planteazapentruromania.ro/services/index.php/donate/mobilpay/%s/fail',
            ]
        ],
    ],
    'production' => [
        'js' => [
            'servicesBase' => '//planteazapentruromania.ro/services/index.php/'
        ],
        'payment' => [
            'mobilpay' => [
                'confirmUrl' => 'https://planteazapentruromania.ro/services/index.php/donate/mobilpay/%s/confirm',
                'returnUrl' => 'https://planteazapentruromania.ro/services/index.php/donate/mobilpay/%s/fail',
            ]
        ],
    ],
);
