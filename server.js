var http = require('http')
var port = process.env.PORT || 1337;
var EventHub = require('.\\eventhub_proxy');
var app = new EventHub();

http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port);
