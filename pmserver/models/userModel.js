var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema(
	{
		email: {
			type: String,
			required: [true, 'Email is required'],
			maxlength: 100,
			minlength: [8, 'Email should be longer than 8 characters'],
			unique: [true, 'This email has been used'],
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email'],
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
		},
	}
);

userSchema.methods.comparePassword = function(inputPassword, callback) {
	bcrypt.compare(inputPassword, this.password, function(err, isMatch) {
		if (err) {
			return callback(err);
		}
		callback(null, isMatch);
	});
};

userSchema.plugin(uniqueValidator);

//Export model
module.exports = mongoose.model('User', userSchema);
