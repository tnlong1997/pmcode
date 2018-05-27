var Item = require('../../models/itemModel');

exports.create_item = function(req, res) {
	var new_item = new Item({
		item_name: req.body.item_name,
		item_description: req.body.item_description,
		item_price: req.body.item_price,
		buyer: req.token._id,
		status: 1 //1 for active item
	});

	new_item.validate(function(db_err) {
		if (db_err) {
			res.send({
				success: false,
				code: 600,
				status: "Database error",
				err: db_err
			});
		} else {
			new_item.save(function(db_err_2) {
				if (db_err_2) {
					res.send({
						success: false,
						code: 600,
						status: "Database Error",
						err: db_err_2
					});
				}
			});		
		}
	});

	return new_item._id;
};

exports.update_item = function(req, res, id) {
	Item.findById(id, function(err, item) {
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

		});
	}); 

	return id;
};

exports.change_item_status = function(req, res, id, status_code) {
	Item.findById(id, function(err, item) {
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
			item.update({status: status_code}, function(stt_update_err) {
				if (stt_update_err) {
					return res.send({
						success: false,
						code: 600,
						status: "Can't update item",
						err: stt_update_err
					});
				}
			});
		}


	});
	return id;
};

exports.delete_item = function(req, res) {
	Item.findById(req.body.id, function(err, item) {
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
			if (item.status == 1) {
				res.send({
					success: true,
					code: 200,
					status: "Cannot delete active item"
				});
			} else {
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
			}
		}
	});
};