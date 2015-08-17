var express = require('express');
var router = express.Router();
var User = require('../models/User');


router.get('/new', function newUser(req, res) {
  //register
  res.render('user/new');
});

router.post('/', function createUser(req, res) {
  //perform the registrtation
 // console.log(req.body);
  User.create(req.body, function (err) {
    if (err) {
      res.render('user/new', {
        err: err
      });
    } else {
      res.redirect('/login');
    }
  });
});

router.post('/login', function doLogin(req, res) {
  User.login(req.body, function (err, user) {
    req.session.regenerate(function () {
      req.session.user = user;
      console.log('user >>>>>>>>>>>>: ', user);
      res.redirect('/');
    });
  });
});
router.get('/logout', function (req, res) {
  req.session.regenerate(function () {

    res.redirect('/user/login');
  });
});
router.get('/login', function loginUser(req, res) {
  req.session.regenerate(function () {
/*
    req.session.user = user;
*/res.render('user/login');
  });

});

module.exports = router;
