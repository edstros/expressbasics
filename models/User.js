var bcrypt = require('bcrypt');

function User(u) {
  this.email = u.email;
  //this.password = u.password;
  this.hashedPassword = u.hashedPassword;
};


User.login = function (u, cb){
  User.collection.find({email: u.email})
}

User.create = function (u, cb) {
  if (u.password !== password_confirm) {
    cb('Passwords do not match!');
  }
  bcrypt.hash(u.password, 8, function (err, hash) {
    u.hashedPassword = hash;
    var user = new User(u);
    User.colection.save(user, db);
  });
};

Object.defineProperty(User, 'collection', {
  get: function () {
    return global.db.collection('user');
  }
});


module.exports = User;
