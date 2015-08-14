var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.get('/new', function newUser(req, res) {
  //register
  res.render('user/new');
});
router.post('/', function createUser(req, res){
  //perform the registrtation
  console.log(req.body);
  User.create(req.body, function (err){
    if (err) {
        res.render('user/new', {err: err});
        } else {
    res.redirect('/');
        }
  });
});


router.get('/login', function loginUser (){
 User.login(req.body, function (err, user){
   console.log(err, user);
 })
  res.redirect('user/login')
});
router.post('/login', function doLogin (){
  res.redirect('user/login')
});




module.exports = router;
