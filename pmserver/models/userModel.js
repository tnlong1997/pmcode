var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      maxlength: 100,
      minlength: [8, 'Username should be longer than 8 characters'],
      unique: [true, 'This email has been used'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      maxlength: 50,
      minlength: [8, 'Password should be longer than 8 characters'],
    },
  }
);

userSchema.plugin(uniqueValidator);

//Export model
module.exports = mongoose.model('User', userSchema);
