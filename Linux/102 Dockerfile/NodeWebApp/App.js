var express = require('express'),
    http = require('http'),
    ip = require('ip');
   

var app = express();
app.get('/', function(req, res, next) { 
    res.send('This page was served from server  : ' + ip.address() );

});

http.createServer(app).listen(process.env.PORT || 8080, function() {
  console.log('Listening on port ' + (process.env.PORT || 8080));
});