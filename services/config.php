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
            'mobilpay' => [],
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
//            ['mail', null, ['dragos.cirjan+ppr-debug@itmediaconnect.ro', [
//                'name'              => 'localhost.localdomain',
//                'host'              => '127.0.0.1',
//                'connection_class'  => 'login',
//                'connection_config' => array(
//                    'username' => 'user',
//                    'password' => 'pass',
//                ),
//            ]]]
        ]
    ],
    'testing' => [],
    'staging' => [],
    'production' => [],
);