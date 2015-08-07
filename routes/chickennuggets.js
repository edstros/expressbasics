var express = require('express')
var router = express.Router();
/*
router.get('/', function (req, res) {
  res.render('templates/chickennuggets');
});*/
router.get('/', function (req, res) {
  res.render('templates/chicken-index');
});

router.get('/order', function (req, res) {
  res.render('templates/chicken-new');
});

router.post('/order', function (req, res) {
  var collection = global.db.collection('chickenNuggets');
  collection.save(req.body, function () {
    res.redirect('/')
  });
  /* console.log(req.body);*/
  //res.send('Thanks for your order!');
});

module.exports = router;
