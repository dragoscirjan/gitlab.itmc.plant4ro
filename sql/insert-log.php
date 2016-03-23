<?php

$em = $app->getEm();

$list = [
    // Donatori
    [
        'donator' => [
            'name' => '',
            'company' => 'Ursus Breweries S.A.',
            'phone' => '',
            'location' => 'Bucuresti, Romania',
        ],
        'donation' => [
            'donation' => '0',
            'trees' => '450',
        ],
        'diploma' => [
            'diplomaType' => 2,
        ]
    ], [
        'donator' => [
            'name' => 'Florin Nan',
            'email' => 'florinnan@gmail.com',
            'location' => 'Rasnov, Brasov',
        ],
        'donation' => [
            'donation' => '0',
            'trees' => '450',
        ],
        'diploma' => [
            'diplomaType' => 0,
        ]
    ],
    // Unitati Silvice
    [
        'donator' => [
            'name' => 'Ing. Moldovan Dragoş',
            'company' => 'RPLP Kronstadt RA',
            'phone' => '0747-298923',
            'location' => 'Braşov, Romania',
        ],
        'donation' => [
            'donation' => '0',
            'trees' => '10000',
            'passive' => 1,
        ],
        'diploma' => [
            'diplomaType' => 1,
        ]
    ], [
        'donator' => [
            'name' => 'Ing. Runceanu Gheorghe',
            'company' => 'RPLP Piatra Craiului RA',
            'phone' => '0268223007',
            'location' => 'Zărneşti, Romania',
        ],
        'donation' => [
            'donation' => '0',
            'trees' => '10000',
            'passive' => 1,
        ],
        'diploma' => [
            'diplomaType' => 1,
        ]
    ], [
        'donator' => [
            'name' => 'Ing. Eftimie Bogdan',
            'company' => 'OS Ciucaş RA',
            'phone' => '0268365556',
            'location' => 'Tărlungeni, Romania',
        ],
        'donation' => [
            'donation' => '0',
            'trees' => '5000',
            'passive' => 1,
        ],
        'diploma' => [
            'diplomaType' => 1,
        ]
    ], [
        'donator' => [
            'name' => 'Ing. Moldovanu Valentin',
            'company' => 'RPL OS Râşnov RA',
            'phone' => '0268231281',
            'location' => 'Râşnov, Romania',
        ],
        'donation' => [
            'donation' => '0',
            'trees' => '10000',
            'passive' => 1,
        ],
        'diploma' => [
            'diplomaType' => 1,
        ]
    ], [
        'donator' => [
            'name' => 'Ing. Flucuş Gheorghe',
            'company' => 'RPLP Stejarul RA',
            'phone' => '0268260556',
            'location' => 'Rupea, Romania',
        ],
        'donation' => [
            'donation' => '0',
            'trees' => '15000',
            'passive' => 1,
        ],
        'diploma' => [
            'diplomaType' => 1,
        ]
    ], [
        'donator' => [
            'name' => '',
            'company' => '',
            'phone' => '',
            'location' => '',
        ],
        'donation' => [
            'donation' => '0',
            'trees' => '10000',
            'passive' => 1,
        ],
        'diploma' => [
            'diplomaType' => 1,
        ]
    ],
];

$donator = new \Ppr\Mvc\Model\Donator([
    'name' => '',
    'email' => '',
    'company' => '',
    'phone' => '',
    'location' => '',
    'companyVAT' => '',
]);

$em->persist($donator); $em->flush();

$donation = new \Ppr\Mvc\Model\Donation([
    'donation' => 0,
    'trees' => 10000,
    'started' => time(),
    'completed' => time(),
]);

$em->persist($donation); $em->flush();

$diploma = new \Ppr\Mvc\Model\Diploma([
    'donationId' => '',
    'diplomaType' => 0,
    'sent' => 0,
]);

$em->persist($diploma); $em->flush();
