var express = require('express'),
    http = require('http'),
    ip = require('ip'),
    redis = require('redis');

var app = express();

var client = redis.createClient('6379', 'redis');


app.get('/', function(req, res, next) {
  client.incr('counter', function(err, counter) {
   if(err) return next(err);
    res.send('This page has been viewed ' + counter + ' times! </br> served from server : ' + ip.address() );
  });
});

http.createServer(app).listen(process.env.PORT || 8080, function() {
  console.log('Listening on port ' + (process.env.PORT || 8080));
});