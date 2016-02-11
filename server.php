<?php

// router.php
switch (true) {
    case preg_match('/^\/services.*/g', $_SERVER["REQUEST_URI"]):
        require 'services/index.php';
        break;
    case !preg_match('/\.(?:php)$/', $_SERVER["REQUEST_URI"]):
        return false;
    default:
        require 'services/index.php';
}

?>
