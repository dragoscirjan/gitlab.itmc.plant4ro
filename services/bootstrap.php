<?php

return array(
    /**
     *
     */
    '/copaci-pantati' => array(

        /**
         *
         */
        'get' => function() {
            return time();
        },
    ),

    /**
     *
     */
    '/lista-donatori' => array(

        /**
         *
         */
        'get' => function() {

        }
    ),

    /**
     *
     */
    '/sustine-facebook/{picture}/{cover}' => array(
        'post' => require 'views/post-sustine-facebook.php'
    ),

);
