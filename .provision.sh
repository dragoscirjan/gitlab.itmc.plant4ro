#! /bin/bash

apt-get update -qq && apt-get upgrade -y -qq

apt-get install -y npm git

npm install -g n && n latest

npm install -g jspm gulp

rm -rf /vagrant/node_modules
cd /vagrant && sudo -u vagrant -- npm install
cd /vagrant && sudo -u vagrant -- jspm install

# sed -e "s/localhost:/\" + (window.location ? window.location.href : 'localhost') + \":/" -i /vagrant/node_modules/live-reload/browser.js
