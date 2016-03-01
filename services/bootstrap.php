<?php

return array(
    /**
     *
     */
    '/tree-count' => array(
        'get' => require 'views/tree-count.php',
    ),

    /**
     *
     */
    '/donator-list' => array(
        'get' => require 'views/donator-list.php',
    ),

    /**
     *
     */
    '/sustine-facebook/{picture}/{cover}' => array(
        'get' => require 'views/post-sustine-facebook.php',
    ),

    /**
     *
     */
    '/curs-valutar' => array(
        'get' => require 'views/exchange-rate.php',
    ),

    /**
     *
     */
    '/donate-paypal' => require 'views/donate-braintree.php',

    /**
     *
     */
    '/donate-mobilpay' => require 'views/donate-mobilpay.php',

    /**
     *
     */
    '/donate-wire' => require 'views/donate-wire.php',

);
