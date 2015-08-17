var bcrypt = require('bcrypt');

function User(u) {
  this.email = u.email;
  //this.password = u.password;
  this.hashedPassword = u.hashedPassword;
};
//does what it says
User.findByEmail = function (email, cb) {
  User.collection.findOne({
    email: email
  }, cb)
};

//also does what it says
User.login = function (u, cb) {
  User.findByEmail(u.email, function (err, user) {
    //compare the passswords
    if (user) {
      //email found, check the password
      bcrypt.compare(u.password, user.hashedPassword, function (err, match) {
        if (match) {
          //login  user if password matches
          cb(null, user);
        } else {
          //handle bad password or some other error
          cb('Bad email/password combination!')
        }
      })
    } else {
      cb('Bad email/password combination!')
    }
  });
};
//register new user
User.create = function (u, cb) {
  //password and password_confirm have to match
  if (u.password !== u.password_confirmation) {
    cb('Passwords do not match!');
  }
  //handle the new user
  bcrypt.hash(u.password, 8, function (err, hash) {
    u.hashedPassword = hash;
    var user = new User(u);
    /*User.colection.save(user, db);*/
    user.save(cb);
  });
};

Object.defineProperty(User, 'collection', {
  get: function () {
    return global.db.collection('user');
  }
});
module.exports = User;

function setPrototype(pojo) {
  return _.create(User.prototype, pojo);
}
