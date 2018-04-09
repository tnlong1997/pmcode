var User = require('../models/userModel');
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
      });
    });

}

exports.user_sign_up = function(req, res, next) {

  var newUser = new User(
    {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    }
  );

  // Check if user username and password is valid
  newUser.validate(function(err) {

    if (err) {
      res.send({
        success: false,
        code: 402,
        err: err.message,
      });
      return false;
    } else {

      // Save User to database
      newUser.save(function(err, user) {
        if (err) {
          res.send({
            success: false,
            code: 400,
            err: err,
          });
          return next(err);
        }
        req.session.user_id = newUser._id;
        res.send({
          success: true,
          code: 200,
          user_id: newUser._id,
        });
      });

    }

  });
}
