var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
console.log(req.query);
var obj = {
  qty: req.query.qty || 1,
  topping: req.query.topping || 'cheese'
}
  res.render('templates/pizza', obj); //object defined by query or by default
});

/*
router.get('/:topping/:qty', function (req, res) {
  var obj = req.params;
  //obj.title = 'Pizza Shop'; //use instead app.locals.title in app.js; creates a global variable
  res.render('templates/pizza', obj); //object that represents your route params
});
*/

module.exports =  router;
