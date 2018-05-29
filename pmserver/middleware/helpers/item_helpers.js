var Item = require('../../models/itemModel');

exports.create_item = function(req, res, callback) {
	var new_item = new Item({
		item_name: req.body.item_name,
		item_description: req.body.item_description,
		item_price: req.body.item_price,
		buyer: req.token._id,
		status: 1 //1 for active item
	});

	new_item.validate(function(db_err) {
		if (db_err) {
			callback(db_err, null);
		} else {
			new_item.save(function(db_err_2) {
				if (db_err_2) {
					callback(db_err_2, null);
				}
			});		
			callback(null, new_item._id);
		}
	});
};

exports.update_item = function(req, res, id, callback) {
	Item.findById(id, function(err, item) {
		if (err) {
			callback(err, null);
		}

		if (!item) {
			callback(null, null);
		}

		item.update(req.body, function(item_update_err) {
			if (item_update_err) {
				callback(item_update_err, null);
			}
			callback(null, item);
		});
	}); 
};

exports.change_item_status = function(req, res, id, status_code, callback) {
	Item.findById(id, function(err, item) {
		if (err) {
			callback(err, null);
		}

		if (!item) {
			callback(null, null);
		} else {
			item.update({status: status_code}, function(stt_update_err) {
				if (stt_update_err) {
					callback(stt_update_err, null);
				}

				callback(null, item);
			});
		}
	});
};

exports.delete_item = function(req, res, callback) {
	Item.findById(req.params.id, function(err, item) {
		if (err) {
			callback(err, null, 0);
		}

		if (!item) {
			callback(null, null, 0);
		} else {
			if (item.status == 1) {
				callback(null, item, 0);
			} else {
				Item.remove({_id: req.params.id}, function(err) {
					if (err) {
						callback(err, null, 0);
					}			
					callback(null, item, 1);
				});
			}
		}
	});
};