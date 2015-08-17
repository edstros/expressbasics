var ObjectId = require('mongodb').ObjectId;
var _ = require('lodash');

//var moment = require('moment');
//service pattern
//function ChickenNuggets() {}
//factory pattern
//ChickenNuggets = {};

//Models create a prototype of an object
//we can set variables for orders here
function Order(o) {
  this.userId = ObjectID(o.userId);//creates an id for user ordering nuggets
  this.name = o.name;
  this.style = o.style;
  this.qty = o.qty;
  this.createdAt = new Date();
  this.complete = false;
  this.cost = this.qty * 0.25;
}
//defines the properties of the model and returns them to the database
Object.defineProperty(Order, 'collection', {
  get: function () {
    return global.db.collection('chickenNuggets');
  }
});
Order.create = function (o, cb) {
  var order = new Order (o);
  order.save(cb);
}
//save the properties to the database
Order.prototype.save = function (cb) {
  Order.collection.save(this, cb);
};
//when we complete an order, update the database with this prototype
Order.prototype.complete = function (cb) {
  Order.collection.update({
    _id: this._id
  }, {
    $set: {
      complete: true
    }
  }, cb);
};
//helper function for setPrototype
Order.findById = function (id, cb) {
  Order.collection.find({
    _id: ObjectID(id)
  }, function (err, order) {
    cb(err, setPrototype(order));
  });
};

//use this in the router.get function in the chickennuggets.js route
//this lets us get and display all the orders in chicken-index.ejs
Order.findAll = function (cb) {
  Order.collection.find().toArray(function (err, orders) {
    var prototypedOrders = orders.map(function (order) {
      return setPrototype(order);
    });
    cb(err, prototypedOrders);
  });
};
module.exports = Order;

function setPrototype(pojo) {
  return _.create(Order.prototype, pojo);
}
/*
function formatAllOrders(orders) {
  return orders.map(function (order) {
    return order.format();
  })
}
function Order(o) {
  this._id = o._id;
  this.name = o.name;
  this.flavor = o.style;
  this.qty = o.qty;
  this.complete = o.complete || false;
  this.createdAt = moment(o._id.getTimestamp()).fromNow();
}
*/
/*
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
return formattedOrders;
};*/
