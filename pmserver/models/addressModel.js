var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
	fullname: {
		type: String, 
		required: true,
		trim: true
	},
	address_1: {
		type: String, 
		required: true, 
		trim: true
	},
	address_2: {
		type: String,
		trim: true,
		default: ""
	},
	city: {
		type: String,
		trim: true,
		required: true
	},
	country: {
		type: String,
		trim: true, 
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'
	}
});

addressSchema.virtual('address_full').get(function() {
	return this.address_1 + " " + this.address_2;
});

var Address = mongoose.model('Address', addressSchema);
module.exports = Address;