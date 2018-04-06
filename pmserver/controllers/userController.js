var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

// Display all user
exports.user_list = function(req, res, next) {

  User.find()
    .exec(function(err, user_list) {
      if (err) {
        return next(err);
      }
      res.send({
        success: true,
        code: 200,
        data: user_list,
      })
    });
}

exports.user_sign_up = function(req, res, next) {

  var newUser = new User(
    {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    }
  );

  newUser.validate(function(err) {
    if (err) {
      res.send({
        success: false,
        code: 402,
        err: err.message,
      });
      return false;
    } else {
      newUser.save(function(err) {
        if (err) {
          res.send({
            success: false,
            code: 400,
            err: err,
          });
          return next(err);
        }
        res.send({
          success: true,
          code: 200,
          user_id: newUser._id,
        });
      });
    }
  });
}
