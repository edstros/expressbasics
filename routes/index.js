app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/pizza/:topping/:qty', function (req, res) {
  var obj = req.params;
  obj.title = 'Pizza Shop';
  res.render('templates/pizza', obj); //object that represents your route params
});


app.get(/hello/, function (req, res) {
  res.send('Hello!');
});

app.get('/awesomethings', function (req, res) {
  setTimeout(function () {
    var awesomeThings = [
    'Pizza',
    'Bacon',
    '2nd Amendment',
    'Pluto',
    'Space Jam'
  ];
    res.render('templates/world', {
      title: 'Awesomesite.com',
      welcome: 'Thanks for coming!',
      awesomeThings: awesomeThings
    });
  }, 5000);
});


app.get('/', function (req, res) {
  res.send('this is the root!'); //first one gets response like in if/else chain
});
//app can be chained, including the .listen
//need to remove the semicolons for this to work

app.get('/test', function (req, res, next) { //will only see this one because of order
  res.write('Test 1!');
  next();
});
app.get('/test', function (req, res) {
  res.end('Test 2!');
});

app.get('/json', function (req, res) {
  res.send({
    'an': 'Object'
  });
});

app.get('/thisshoulderror', function (req, res) {
  res.send(badVariable);
});
