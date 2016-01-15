#! /usr/local/bin/node

// Create server
require('http').createServer(function(req, res){
  require('serve-static')('dist', {'index': ['index.html', 'index.htm']})(req, res, require('finalhandler')(req, res));
}).listen(3000);
