var express = require('express');
var moment = require('moment');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
/*
router.get('/', function (req, res) {
  res.render('templates/chickennuggets');
});*/
router.get('/', function (req, res) {
  var collection = global.db.collection('chickenNuggets');
  collection.find().toArray(function (err, orders) {

    var formattedOrders = orders.map(function (order) {
      //take an order and return an obect we want it to be
      console.log(complete)
      return {
        _id: order._id,
        name: order.Nuggets_for,
        flavor: order.style,
        qty: order.qty,
        createdAt: moment(order._id.getTimestamp()).fromNow(),

      };
    });
    res.render('templates/chicken-index'/*, {
  uncompletedOrders: formattedOrders && !complete
}*/)
  })
})


      /*completedOrders:   */







router.get('/order', function (req, res) {
  res.render('templates/chicken-new');
});
router.post('/order', function (req, res) {
  var collection = global.db.collection('chickenNuggets');
  collection.save(req.body, function () {
    res.redirect('/chickennuggets')
  });
  /* console.log(req.body);*/
  //res.send('Thanks for your order!');
});
router.post('/order/:id/complete', function (req, res) {
  var collection = global.db.collection('chickenNuggets');
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
});
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
