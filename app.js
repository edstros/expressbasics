var fs = require('fs');
//npm requires
var express = require('express');
var lessCSS = require('less-middleware');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

//route requires
var routes = require('./routes/index');
var pizza = require('./routes/pizza');
var chickennuggets = require('./routes/chickennuggets');
var imgur = require('./routes/imgur');
var user = require('./routes/user');

//variables
var app = express(); //this was before the app.get files were moved to index.js
if (process.env.NODE_ENV !== 'production') {
  require('./lib/secrets');
}
require('./lib/mongodb');
//settings to express
app.set('view engine', 'ejs');
app.set('case sensitive routing', true); //just what it says
//global variable; all of the templates have access to it
app.locals.title = 'aweso.me';
//shorthand
/*
var app = require('express')();
*/

/*app.use(function (req, res, next) {
  //logging at the top
  console.log('Request at ' + new Date().toISOString());
  next(); //respond to this route but look for others as well.
});*/
/*npm logging module / need to create a stream*/

app.use(session({
  secret: 'expressbasicsisareallyawesomeapp',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(lessCSS('www/stylesheets'));

var logStream = fs.createWriteStream('access.log', {
  flags: 'a'
}); //'a' appends to file

/*app.use(morgan('dev')); //log output simple format*/
/*app.use(morgan('combined')); //log output apache format*/
/*app.use(morgan('common')); //log output shorter format */

app.use(morgan('combined', {
  stream: logStream
})); //log output to file
app.use(morgan('dev'));

/*app.use(function (err, req, res, next){
  var client = require ('./lib/loggly')('error');
});*/
/*var client = loggly.createClient({
  token: "1cae3802-0bfb-4462-8b6f-4697c794867c",
  subdomain: "edwinacevedo",
  tags: ["NodeJS"],
  json: true
});*/

//using loggly, in case server goes down, can still see logs
// we can create a loggly client with whatever tag we choose
// to specify the type of log that is occurring. here is one for
// incoming requests to our server:
app.use(function (err, req, res, next) {
  var client = require('./lib/loggly')('incoming');
  client.log({
    ip: req.ip,
    date: new Date(),
    url: req.url,
    status: res.statusCode,
    method: req.method
  });
  next();
});

// here is another loggly client for specifically created
// to handle error logs
app.use(function (err, req, res, next) {
  var client = require('./lib/loggly')('error');
  client.log({
    ip: req.ip,
    date: new Date(),
    url: req.url,
    status: res.statusCode,
    method: req.method,
    error: err
  });
  res.status(500).send('[Error message]');
});

/*app.use(function (req, res, next) {
  client.log({
    ip: req.ip,
    date: new Date(),
    url: req.url,
    status: res.statusCode,
    method: req.method,
    err: err
  });
  next();
});*/

app.use(function getAuthStatus(req, res, next){
  res.locals.user = req.session.user || null;

  next();
});

app.use('/', routes);
app.use('/user', user);
app.use(express.static('www'));
//middleware function to check all authentication
app.use(function requireAuth (req, res, next) {
if (req.session.user){

  /*res.locals.user = req.session.user; //check user variable*/
  next();
} else {
  res.locals.user = null; //if
  res.redirect('user/login')
}
/*  req.session.regenerate(function () {
    console.log('SESSION >>>>>\n', req.session);
    console.log('req.sessionID >>>\n', req.sessionID);
    next();
  });*/
});
//routes --  one way to do this
//require('./routes/index');
app.use('/pizza', pizza);
app.use('/chickennuggets', chickennuggets);
app.use('/imgur', imgur);
app.use(function (req, res) {
  res.status(403); //400s before the 500s
  res.send('Unauthorized!');
});
//put error handling at the end; order is important
//if it's at the top, everything will be unauthorized
app.use(function (err, req, res, next) {
  //pass 4 arguments to create an error handling middleware
  console.log('OH NO! THERE WAS AN ERROR', err.stack);
  res.status(500).send('My Bad');
});
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
module.exports = app;
