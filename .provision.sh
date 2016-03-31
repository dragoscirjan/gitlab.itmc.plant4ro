#! /bin/bash

apt-get update -qq && apt-get upgrade -y

apt-get install -y npm

npm install -g n && n latest

npm install -g gulp jspm

# cd /vagrant
# sudo -u vagrant -- npm install
# sudo -u vagrant -- jspm install


debconf-set-selections <<< 'mysql-server mysql-server/root_password password weltest'
debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password weltest'

apt-get install -y apache2 php5 php5-cli php5-mysql php5-gd php5-curl mysql-server mysql-client

service mysql restart

echo "create database if not exists wordpress" | mysql -uroot -pweltest
mysql -uroot -pweltest wordpress < /vagrant/sql/blog.sql

cat /vagrant/virtualhost.local.conf > /etc/apache2/sites-enabled/000-default.conf

a2enmod headers
a2enmod rewrite

service apache2 restart
