var User = require('../models/userModel');
var bcrypt = require('bcrypt-nodejs');
var secret = require('../config/secret');
var jwt = require('jsonwebtoken');

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

// User login
exports.user_log_in = function(req, res, next) {

  if (!req.body.email) {
    return res.send({
      success: false,
      code: 400,
      err: "No email in input"
    });
  }

  if (!req.body.password) {
    return res.send({
      success: false,
      code: 400,
      err: "No password in input"
    })
  }

  User.findOne({username: req.body.email})
    .exec(function(err, user) {
      if (err) {
        return res.send({
          success: false,
          code: 400,
          err: err
        });
      }

      if (!user) {
        return res.send({
          success: false,
          code: 400,
          err: "Authenticate failed. User not found"
        });
      }

      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign({username: user.email, _id: user._id}, secret, {
            expiresIn: 1000000000000000 // in seconds
          });
          res.json({
            success: true,
            code: 200,
            token: token,
          });
        } else {
          res.send({
            success: false,
            message: 'Authentication failed. Passwords did not match.'
          });
        }
      })
    });
}
