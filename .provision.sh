#! /bin/bash

apt-get update -qq && apt-get upgrade -y

apt-get install -y npm

npm install -g n && n latest

npm install -g gulp jspm

# cd /vagrant
# sudo -u vagrant -- npm install
# sudo -u vagrant -- jspm install


apt-get install -y apache2 php5 php5-cli php5-mysql php5-gd mysql-server mysql-client

sed -e "s/\/var\/www\/html/\/vagrant/g" -i 000-default.conf

service apache2 restart
