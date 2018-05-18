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
		profile: {
			firstName: {
				type: String,
				required: [true, "User's first name is required"],
				default: "",
			},
			lastName: {
				type: String,
				required: [true, "User's last name is required"],
				default: "",
			},
			dateOfBirth: {
				type: Date,
				required: [true, "User's date of birth is required"],
				default: Date.now,
			}
		},
		passwordResetToken: String,
		passwordResetExpires: Date,
		currentOrders: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Order',
		}],
		pastOrders: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Order',
		}]
	},
	{timestamps: true}
);

userSchema.methods.comparePassword = function(inputPassword, callback) {
	bcrypt.compare(inputPassword, this.password, function(err, isMatch) {
		if (err) {
			return callback(err);
		}
		callback(null, isMatch);
	});
};

userSchema.virtual('profile.fullName').get(function() {
	return this.profile.firstName + " " + this.profile.lastName;
});

userSchema.virtual('createdAtTimestamp').get(function() {
	return this.createdAt.getTime();
});

userSchema.virtual('updatedAtTimestamp').get(function() {
	return this.updatedAt.getTime();
});

userSchema.virtual('dateOfBirthTimestamp').get(function() {
	return this.dateOfBirth.getTime();
});

userSchema.plugin(uniqueValidator);

//Export model
module.exports = mongoose.model('User', userSchema);
