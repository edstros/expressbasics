var express = require('express');
var app = express();

//shorthand
/*
var app = require('express')();
*/

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.use(express.static('public'));
app.get(/hello/, function (req, res) {
  res.send('Hello!');
});
app.get('/world', function (req, res) {
  res.send('World!');
});
app.get('/', function (req, res) {
  res.send('this is the root!');//first one gets response like in if/else chain
});
//app can be chained, including the .listen
//need to remove the semicolons for this to work

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
