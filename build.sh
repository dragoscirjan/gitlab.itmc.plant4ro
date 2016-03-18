#! /bin/bash

# npm install
# jspm install

# cd services
# [ -f composer.phar ] && ./composer.phar selfupdate
# [ -f composer.phar ] || wget -q https://getcomposer.org/installer -O - | php
# [ -d vendor ] && rm -rf vendor
# ./composer.phar install
# cd ..

ENV='development'
[ -f services/.env ] && ENV=`cat services/.env`

case $ENV in
    'development') URL='http://planteazapentruromania.local/services/index.php/config-js';;
    'testing') URL='http://test.planteazapentruromania.ro/services/index.php/config-js';;
    'staging') URL='http://stage.planteazapentruromania.ro/services/index.php/config-js';;
    'production') URL='http://planteazapentruromania.ro/services/index.php/config-js';;
esac

wget -q $URL -O src/lib/app/config.js

case $ENV in
    'development') gulp build;;
    'testing') gulp build;;
    'staging') gulp bundle;;
    'production') gulp bundle;;
esac
