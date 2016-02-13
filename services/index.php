<?php
session_start();

require_once __DIR__.'/vendor/autoload.php';

$app = new Silex\Application();

foreach (require 'bootstrap.php' as $map => $callbacks) {
//    var_dump($map, $callbacks);
    foreach ($callbacks as $call => $callback) {
//        var_dump($call, $callback);
        $app->$call($map, $callback);
    }
}


$app['debug'] = true;
$app->run();
