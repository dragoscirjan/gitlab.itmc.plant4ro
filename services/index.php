<?php

$composer = require_once __DIR__.'/vendor/autoload.php';

$app = new \Ppr\Application(array(
    'path' => __DIR__
));


$app->post('/contact', '\Ppr\Mvc\Controller\Contact::sendEmail');

$app->get('/tree-count', '\Ppr\Mvc\Controller\Index::treeCount');
$app->get('/donator-list', '\Ppr\Mvc\Controller\Index::donatorList');

$app->get('/curs-valutar', '\Ppr\Mvc\Controller\Donate::exchangeRate');

$app->get('/donate/braintree-token', '\Ppr\Mvc\Controller\Donate::braintreeClientToken');
$app->post('/donate/braintree', '\Ppr\Mvc\Controller\Donate::braintree');

$app->post('/donate/mobilpay-token', '\Ppr\Mvc\Controller\Donate::mobilpayClientToken');
$app->get('/donate/mobilpay/{orderId}/{status}', '\Ppr\Mvc\Controller\Donate::mobilpay');
$app->post('/donate/mobilpay/{orderId}/{status}', '\Ppr\Mvc\Controller\Donate::mobilpay');
$app->get('/donation/{orderId}', '\Ppr\Mvc\Controller\Donate::info');

$app->get('/pdf/{orderId}', '\Ppr\Mvc\Controller\Pdf::index');

$app->get('/config-js', '\Ppr\Mvc\Controller\Config::configJs');

$app->get('/update-forestry-units', '\Ppr\Mvc\Controller\Index::updateForestryUnits');
$app->get('/update-donations', '\Ppr\Mvc\Controller\Index::updateDonations');
$app->get('/event-locations/{county}', '\Ppr\Mvc\Controller\Index::eventLocations');

$app->run();
