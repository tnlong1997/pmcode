var Address = require('../models/addressModel');

exports.address_list = function(req, res) {
	Address.find().exec(function(err, addresses) {
		if (err) {
			return res.send({
				success: false,
				code: 600,
				status: err
			});
		}

		if (addresses.length == 0) {
			res.send({
				success: true,
				code: 200,
				status: "no address in database"
			});

		}

		res.send({
			success: true,
			code: 200,
			status: "received order list",
			addresses: addresses
		});
	});
};

exports.create_address = function(req, res) {
	if (req.body.fullname
		&& req.body.address_1
		&& req.body.address_2
		&& req.body.city
		&& req.body.country) {

		var owner_id = req.token._id;

		//create new Item
		var new_address = new Address({
			fullname: req.body.fullname,
			address_1: req.body.address_1,
			address_2: req.body.address_2,
			city: req.body.city,
			country: req.body.country,
			user: owner_id
		});

		new_address.validate(function(db_err) {
			if (db_err) {
				res.send({
					success: false,
					code: 600,
					status: "Database error",
					err: db_err
				});
			} else {
				new_address.save(function(db_err_2) {
					if (db_err_2) {
						res.send({
							success: false,
							code: 600,
							status: "Database Error",
							err: db_err_2
						});
					}

					res.send({
						success: true,
						code: 200,
						status: "Address created successfully",
						address: new_address
					});
				});
			}
		});
	} else {
		return res.send({
			success: false,
			code: 400,
			status: "Missing Required Field"
		});
	}
};

exports.edit_address = function(req, res) {
	Address.findById(req.params.id, function(find_id_err, address) {
		if (find_id_err) {
			return res.send({
				success: false,
				code: 600,
				status: "Database CastError",
				err: find_id_err
			});
		}

		if (!address) {
			res.send({
				success: false,
				code: 601,
				status: "Can't find item by given ID"
			});
		}

		address.update(req.body, function(address_update_err) {
			if (address_update_err) {
				return res.send({
					success: false,
					code: 600,
					status: "Can't update address",
					err: address_update_err
				});
			}
			return res.send({
				success: true,
				code: 200,
				status: "Updated address successfully"
			});

		});

	});
};

exports.delete_address = function(req, res) {
	Address.remove({_id: req.params.id}, function(db_err) {
		if (db_err) {
			return res.send({
				success: false,
				code: 600,
				status: "Database Error",
				err: db_err
			});
		}

		return res.send({
			success: true,
			code: 200,
			status: "Delete address successfully"
		});
	});
};