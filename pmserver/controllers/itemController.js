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

		item_helpers.create_item(req, res, function(err, item_id) {
			if (err) {
				res.send({
					success: false,
					code: 600,
					status: "Database error",
					err: err
				});
			}
			res.send({
				success: true,
				code: 200,
				status: "Created item Successfully",
				item_id: item_id
			});

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
	item_helpers.update_item(req, res, req.params.id, function(err, item) {
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

		return res.send({
			success: true,
			code: 200,
			status: "Item update successful.",
			item_id: item._id
		});

	});
};

exports.delete_item = function(req, res) {
	item_helpers.delete_item(req, res, function(err, item, status) {
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
		} else {
			if (status == 0) {
				res.send({
					success: true,
					code: 200,
					status: "Cannot delete active item"
				});
			} else {
				return res.send({
					success: true,
					code: 200,
					status: "Delete update successful.",
				});
			}
		}

		
	});
};
