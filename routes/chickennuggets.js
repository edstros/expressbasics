var express = require('express');
var router = express.Router();

var moment = require('moment');
var Order = require('../models/ChickenNuggets');

/*
router.get('/', function (req, res) {
  res.render('templates/chickennuggets');
});*/
router.get('/', function (req, res) {
  /*ChickenNuggets.findAllOrders(function (err, orders)*/
  //search using the ChickenNuggets model
 var id = req.session.user._id;
  Order.findAllByUserId(id, function (err, orders) {
    res.render('templates/chicken-index', {
      orders: formatAllOrders(orders)
    });
  });

  function formatAllOrders(orders) {
    return orders.map(function (order) {
      order.flavor = order.style;
      order.createdAt = moment(order._id.getTimestamp()).fromNow();
      delete order.style;
      return order;
    });
  };
});

router.get('/order', function (req, res) {
  res.render('templates/chicken-new');
});

router.post('/order', function (req, res) {
  /*  var order = new Order(req.body);
    order.save(function () {*/
  var o = req.body;
  o.userId = req.session.user._id;
  Order.create(o, function () {
    res.redirect('/chickennuggets');

  });
  /* var collection = global.db.collection('chickenNuggets');
  collection.save(req.body, function () {
    res.redirect('/chickennuggets')
});
   console.log(req.body);*/
  //res.send('Thanks for your order!');
});
router.post('/order/:id/complete', function (req, res) {
  Order.findById(req.params.id, function (err, order) {
    order.complete(function () {
      res.redirect('/chickennuggets');
    });
  });
});
/* var collection = global.db.collection('chickenNuggets');
  collection.update({
      _id: ObjectId(req.params.id)
    }, {
      $set: {
        complete: true
      }
    },
    function () {
      res.redirect('/chickennuggets')
    });
});*/
/*
router.get('/', function (req, res) {
  var collection = global.db.collection('chickenNuggets');
  orderComplete.addEventListener('click', function () {
    collection.update({
      complete: {
        $exists: 1
      }
    }, {
      $rename: {
        name: 'nameDone',
        flavor: 'flavorDone',
        qty: 'qtyDone'
      }
    }, {
      multi: true
    });
  });
});
*/
module.exports = router;
