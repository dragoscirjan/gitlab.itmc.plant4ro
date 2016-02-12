<?php

//var_dump($_SERVER);

// router.php
switch (true) {
//    case preg_match('/^\/services.*/i', $_SERVER["REQUEST_URI"]):
//        require 'services/index.php';
//        break;
    case !preg_match('/\.(?:php)$/', $_SERVER["REQUEST_URI"]):
        return false;
    default:
        require 'services/index.php';
}

?>
