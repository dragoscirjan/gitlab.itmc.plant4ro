<?php

require_once __DIR__.'/vendor/autoload.php';

$app = new Silex\Application();

foreach (require 'bootstrap.php' as $map => $callbacks) {
    foreach ($callbacks as $call => $callback) {
        $app->$call($map, $callback);
    }
}

$app->run();
