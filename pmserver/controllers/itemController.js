var Item = require('../models/itemModel');
var item_helpers = require('../middleware/helpers/item_helpers');

exports.item_list = function(req, res) {
	Item.find().exec(function(err, item_list) {
		if (err) {
			return res.send({
				success: false,
				code: 600,
				status: "Unable to access to database",
				err: err

			});
		}

		if (item_list.length == 0) {
			res.send({
				success: true,
				code: 200,
				status: "no item in database"
			});
		} else {
			res.send({
				success: true,
				code: 200,
				status: "received item list",
				items: item_list
			});
		}
	});
};

exports.create_item = function(req, res) {
	if (req.body.item_name
		&& req.body.item_description
		&& req.body.item_price) {

		var new_item_id = item_helpers.create_item(req, res);

		res.send({
			success: true,
			code: 200,
			status: "Created item Successfully",
			item_id: new_item_id
		});

	} else {

		return res.send({
			success: false,
			code: 400,
			status: "all fields required"
		});
	}
};

exports.edit_item = function(req, res) {
	
	var item_id = item_helpers.update_item(req, res, req.params.id);

	return res.send({
		success: true,
		code: 200,
		status: "Item update successful.",
		item_id: item_id
	});
};

exports.delete_item = function(req, res) {
	item_helpers.delete_item(req, res);
};
