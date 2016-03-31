<?php

$composer = require_once __DIR__.'/vendor/autoload.php';

use Doctrine\ORM\Tools\Console\ConsoleRunner;
use Doctrine\ORM\EntityManager;

$app = new \Ppr\Application(array( 'path' => __DIR__ ));

return ConsoleRunner::createHelperSet($app->getEm());