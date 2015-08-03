var express = require('express');
//var app = express(); this was before the app.get files were moved to index.js

var routes = require('./routes/index');
var pizza = require('./routes/pizza');

//settings to express
app.set('view engine', 'ejs');


//shorthand
/*
var app = require('express')();
*/
app.use(function (req, res, next) {
  //logging at the top
  console.log('Request at ' + new Date().toISOString());
  next(); //respond to this route but look for others as well.
});
app.use(express.static('public'));
//routes --  one way to do this
//require('./routes/index');

app.use('/', routes);


app.use(function (req, res) {
  res.status(403); //400s before the 500s
  res.send('Unauthorized!');
});
//put error handling at the end; order is important
//if it's at the top, everything will be unauthorized
app.use(function (err, req, res, next) {
  //pass 4 arguments to create an error handling middleware
  console.log('MISTAKES WERE MADE!', err.stack);
  res.status(500).send('My Bad');
});
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
