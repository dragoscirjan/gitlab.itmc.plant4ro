#! /bin/bash

apt-get update -qq && apt-get upgrade -y

apt-get install -y npm

npm install -g n && n latest

cd /vagrant
sudo -u vagrant -- npm install
sudo -u vagrant -- jspm install


apt-get install -y php5-cli php5-mysql php5-gd2 
