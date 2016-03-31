<?php

return array(
    /**
     *
     */
    '/tree-count' => array(
        'get' => require_once 'views/tree-count.php',
    ),

    /**
     *
     */
    '/donator-list' => array(
        'get' => require_once 'views/donator-list.php',
    ),

    /**
     *
     */
    '/sustine-facebook/{picture}/{cover}' => array(
        'get' => require_once 'views/post-sustine-facebook.php',
    ),

    /**
     *
     */
    '/curs-valutar' => array(
        'get' => require_once 'views/exchange-rate.php',
    ),

    /**
     *
     */
    '/donate/{method}' => require_once 'views/donate.php',
    '/donate/{method}/{action}' => require_once 'views/donate.php',

//    /**
//     *
//     */
//    '/donate-mobilpay' => require 'views/donate-mobilpay.php',
//
//    /**
//     *
//     */
//    '/donate-wire' => require 'views/donate-wire.php',

);
