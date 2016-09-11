#! /bin/bash

apt-get install wkhtmltopdf xvfb pdftk

ENV='development'
[ -f services/.env ] && ENV=`cat services/.env`

case $ENV in
    'development') URL='http://planteazapentruromania.local';;
    'testing') URL='https://test.planteazapentruromania.ro';;
    'staging') URL='https://stage.planteazapentruromania.ro';;
    'production') URL='https://planteazapentruromania.ro';;
esac

if [ "$ENV" == "production" ]; then
    git pull origin master
else
    git pull origin develop
fi

echo "$*" | grep +npm && {
    npm install
    jspm install
}

echo "$*" | grep +composer && {
    cd services
    rm -rf composer.lock
    [ -f composer.phar ] && ./composer.phar selfupdate
    [ -f composer.phar ] || wget -q https://getcomposer.org/installer -O - | php
    [ -d vendor ] && rm -rf vendor
    rm -rf composer.lock
    ./composer.phar install
    cd ..
}

echo "$*" | grep +doctrine && {
    cd services
    ./vendor/bin/doctrine orm:schema-tool:update -f
    cd ..
    wget --no-check-certificate -q "$URL/services/index.php/update-donations" -O /dev/nullv
    wget --no-check-certificate -q "$URL/services/index.php/update-forestry-units" -O /dev/nullv
}

echo wget -q "$URL/services/index.php/config-js" -O src/lib/app/config.js
wget --no-check-certificate -q "$URL/services/index.php/config-js" -O src/lib/app/config.js

case $ENV in
    'development') gulp build;;
    'testing') gulp build;;
    'staging') gulp bundle;;
    'production') gulp bundle;;
esac

echo "$*" | grep +snapshot && {
    export DEBUG="dalia:*"
    SED_URL=${URL//\//\\\/};
    sed -e "s/http:\/\/planteazapentruromania.local/${SED_URL}/g" -i .gulp/tasks/snapshot.js
    gulp snapshot
}

if [ "$ENV" != "production" ]; then
    cat > robots.txt <<ROBOTS
User-agent: *
Disallow: /
ROBOTS
fi

chmod -R 777 services/cache services/src/Ppr/Mvc/Model/Proxy

touch services/.log
chmod -R 777 services/.log services/cache blog/wp-content/uploads
