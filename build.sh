#! /bin/bash

git pull

apt-get install wkhtmltopdf xvfb pdftk

echo "$*" | grep +npm && {
    npm install
    jspm install
}

echo "$*" | grep +composer && {
    cd services
    [ -f composer.phar ] && ./composer.phar selfupdate
    [ -f composer.phar ] || wget -q https://getcomposer.org/installer -O - | php
    [ -d vendor ] && rm -rf vendor
    ./composer.phar install
    cd ..
}

echo "$*" | grep +doctrine && {
    cd services
    ./vendor/bin/doctrine orm:schema-tool:update -f
    cd ..
}

ENV='development'
[ -f services/.env ] && ENV=`cat services/.env`

case $ENV in
    'development') URL='http://planteazapentruromania.local/services/index.php/config-js';;
    'testing') URL='https://test.planteazapentruromania.ro/services/index.php/config-js';;
    'staging') URL='https://stage.planteazapentruromania.ro/services/index.php/config-js';;
    'production') URL='https://planteazapentruromania.ro/services/index.php/config-js';;
esac

echo wget -q $URL -O src/lib/app/config.js
wget --no-check-certificate -q $URL -O src/lib/app/config.js

case $ENV in
    'development') gulp build;;
    'testing') gulp build;;
    'staging') gulp bundle;;
    'production') gulp bundle;;
esac

chmod -R 777 services/cache services/src/Ppr/Mvc/Model/Proxy

touch services/.log
chmod -R 777 services/.log
chmod -R 777 blog/wp-contents/uploads
