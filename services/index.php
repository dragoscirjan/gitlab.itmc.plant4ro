<?php

$composer = require_once __DIR__.'/vendor/autoload.php';

$app = new \Ppr\Application(array(
    'path' => __DIR__
));

$app->get('/tree-count', '\Ppr\Mvc\Controller\Index::treeCount');
$app->get('/donator-list', '\Ppr\Mvc\Controller\Index::donatorList');

$app->get('/curs-valutar', '\Ppr\Mvc\Controller\Donate::exchangeRate');

$app->get('/donate/braintree-token', '\Ppr\Mvc\Controller\Donate::braintreeClientToken');
$app->post('/donate/braintree', '\Ppr\Mvc\Controller\Donate::braintree');

$app->run();
