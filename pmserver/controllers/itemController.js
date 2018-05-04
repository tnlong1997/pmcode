var Item = require('../models/itemModel');

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

		var new_item = new Item({
			item_name: req.body.item_name,
			item_description: req.body.item_description,
			item_price: req.body.item_price
		});

		new_item.save(function(error) {
			if (error) {
				return res.send({
					success: false,
					code: 600,
					status: "Unable to save item",
					err: error
				});
			}

			return res.send({
				success: true,
				code: 200,
				status: "Item Created"
			});
		});
	} else {
		// Error handler in future.
		// var err = new Error("All fields required");
		// err.status = 400;
		// return next(err);
		return res.send({
			success: false,
			code: 400,
			status: "all fields required"
		});
	}
};

exports.edit_item = function(req, res) {
	Item.findById(req.params.id, function(err, item) {
		if (err) {
			return res.send({
				success: false,
				code: 600,
				status: "Error with database",
				err: err
			});
		}

		if (!item) {
			return res.send({
				success: false,
				code: 601,
				status: "Item not found",
			});
		}

		item.update(req.body, function(item_update_err) {
			if (item_update_err) {
				return res.send({
					success: false,
					code: 600,
					status: "Can't update item",
					err: item_update_err
				});
			}

			return res.send({
				success: true,
				code: 200,
				status: "Item update successful."
			});

		});
	});
};

exports.delete_item = function(req, res) {
	Item.remove({
		_id: req.params.id
	}, function(err) {
		if (err) {
			return res.send({
				success: false,
				code: 600,
				status: err
			});
		}

		return res.send({
			success: true,
			code: 200,
			status: "Successfully delete this item"
		});
	});
};
