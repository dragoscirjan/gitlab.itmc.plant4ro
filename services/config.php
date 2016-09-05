<?php

$domain = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['SERVER_NAME'];

return [
    'development' => [
        'db' => [
            'dbname' => 'donations',
            'user' => 'root',
            'password' => 'weltest',
            'host' => 'localhost',
            'driver' => 'pdo_mysql',
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
                        'username' => 'debug@prieteniipadurilor.ro',
                        'password' => 'F4s95RDEUVz6',
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
            ['mail', null, ['suport+debug-ppr@itmediaconnect.ro', [
                'name' => 'mail.itmediaconnect.ro',
                'host' => 'mail.itmediaconnect.ro',
                'port' => 587,
                'connection_class'  => 'plain',
                'connection_config' => [
                    'username' => 'debug@prieteniipadurilor.ro',
                    'password' => 'F4s95RDEUVz6',
                    'ssl' => 'tls',
                ],
            ]]]
        ],
        'payment' => [
            'braintree' => [
                'environment' =>'sandbox',
                'merchantId' => '89pcx4ss3kz8x5q7',
                'publicKey' => 'twp79qy2pg755nhz',
                'privateKey' => '7c97f0a849a5cba4bbbc8ad9b2fe578f',
                'merchantAccountId' => [
                    'eur' => '89pcx4ss3kz8x5q7',
                    'usd' => 'itmediaconnect'
                ]
            ],
            'mobilpay' => [
                'paymentUrl' => 'http://sandboxsecure.mobilpay.ro',
                'certPath' => __DIR__ . '/cert/sandbox.UQUX-6E8G-G8TG-B88U-N9UG.public.cer',
                'keyPath' => __DIR__ . '/cert/sandbox.UQUX-6E8G-G8TG-B88U-N9UGprivate.key',
                'signature' => 'UQUX-6E8G-G8TG-B88U-N9UG',
                'confirmUrl' => $domain . '/services/index.php/donate/mobilpay/%s/confirm',
                'returnUrl' => $domain . '/services/index.php/donate/mobilpay/%s/return',
            ],
            'debug' => [
                'dragos.cirjan+ppr@itmediaconnect.ro'
            ]
        ],
        'path' => __DIR__,
        'pdf' => [
            'zoom' => '0.9985'
        ],
        'url' => $domain,
    ],
    'testing' => [
        'db' => [
            'dbname' => 'plant4ro_test_do',
            'user' => 'plant4ro',
            'password' => 'plant4roma',
            'host' => 'localhost',
            'driver' => 'pdo_mysql',
        ],
        'js' => [
            'servicesBase' => '//test.planteazapentruromania.ro/services/index.php/'
        ],
        'pdf' => [
            'zoom' => '1.0325'
        ],
    ],
    'staging' => [
        'db' => [
            'dbname' => 'plant4ro_stage_do',
            'user' => 'plant4ro',
            'password' => 'plant4roma',
            'host' => 'localhost',
            'driver' => 'pdo_mysql',
        ],
        'js' => [
            'servicesBase' => '//stage.planteazapentruromania.ro/services/index.php/'
        ],
        'payment' => [
            'braintree' => [
                'environment' =>'production',
                'merchantId' => 'cqgpm48h5hgkhvb4',
                'publicKey' => '5jc7b3v3ywc9tc4f',
                'privateKey' => '3c5ce5385f63843dd8d41f1656f668d5',
                'merchantAccountId' => [
                    'eur' => 'prieteniipadurilordinromaniaEUR',
                    'usd' => 'prieteniipadurilordinromaniaUSD'
                ]
            ],
            'mobilpay' => [
                'paymentUrl' => 'https://secure.mobilpay.ro',
                'certPath' => __DIR__ . '/cert/live.UQUX-6E8G-G8TG-B88U-N9UG.public.cer',
                'keyPath' => __DIR__ . '/cert/live.UQUX-6E8G-G8TG-B88U-N9UGprivate.key',
                'signature' => 'UQUX-6E8G-G8TG-B88U-N9UG',
            ]
        ],
    ],
    'production' => [
        'db' => [
            'dbname' => 'plant4ro_live_do',
            'user' => 'plant4ro',
            'password' => 'plant4roma',
            'host' => 'localhost',
            'driver' => 'pdo_mysql',
        ],
        'contact' => [
            'from' => ['noreply@prieteniipadurilor.ro', 'Planteaza pentru Romania Contact'],
            'to' => ['office@prieteniipadurilor.ro', 'Prietenii Padurilor']
        ],
        'js' => [
            'servicesBase' => '//planteazapentruromania.ro/services/index.php/'
        ],
    ],
];
