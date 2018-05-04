var Order = require('../models/orderModel');
var Item = require('../models/itemModel');
var User = require('../models/userModel');

exports.order_list = function(req, res) {
	Order.find().exec(function(err, orders) {
		if (err) {
			return res.send({
				success: false,
				code: 600,
				status: err
			});
		}

		if (orders.length == 0) {
			res.send({
				success: true,
				code: 200,
				status: "no order in database"
			});
		} else {
			res.send({
				success: true,
				code: 200,
				status: "received order list",
				orders: orders
			});
		}
	});
};

exports.create_order = function(req, res) {
	if (req.body.order_name
		&& req.body.traveler_fee
		&& req.body.item_name
		&& req.body.item_description
		&& req.body.item_price) {

		var buyerId = req.token._id;

		//create new Item
		var new_item = new Item({
			item_name: req.body.item_name,
			item_description: req.body.item_description,
			item_price: req.body.item_price
		});

		new_item.save(function(error) {
			if (error) { 										//this error contains duplicated key.
				return res.send({
					success: false,
					code: 600,
					status: error
				});
			}
		});

		var new_order = new Order({
			order_name: req.body.order_name,
			item: new_item._id,
			traveler_fee: req.body.traveler_fee,
			total_fee: 0,									//total fee will be calculated later
			created_date_time: Date.now(),
			buyer: buyerId
		});

		new_order.save(function(order_error) {
			if (order_error) {
				return res.send({
					success: false,
					code: 600,
					status: order_error
				});
			} else {
				User.findByIdAndUpdate(buyerId, {$addToSet: {currentOrders: new_order._id}}, function(err) {
					if (err) {
						return res.send({
							success: false,
							code: 600,
							err: "Error adding order to buyer databases",
						});
					}

					return res.send({
						success: true,
						code: 200,
						status: "order and item created",
						order_id: new_order._id,
						item_id: new_item._id
					});
				});
			}
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

exports.edit_order = function(req, res) {
	Order.findById(req.params.id, function(order_err, order) {
		if (order_err) {
			return res.send({
				success: false,
				code: 600,
				status: "Order not found",
				err: order_err
			});
		}

		if (!order) {
			return res.send({
				success: false,
				code: 601,
				status: "Can't find order with given id"
			});
		}

		Item.findById(order.item, function(item_err, item) {
			if (item_err) {
				return res.send({
					success: false,
					code: 600,
					status: "Item not found",
					err: item_err
				});
			}

			if (!item) {
				return res.send({
					success: false,
					code: 601,
					status: "Can't find item with given id"
				});
			}

			item.update(req.body, function(item_update_err) {
				if (item_update_err) {
					return res.send({
						success: false,
						code: 400,
						status: "Can't update item",
						err: item_update_err
					});
				}
			});
		});

		order.update(req.body, function(order_update_err) {
			if (order_update_err) {
				return res.send({
					success: false,
					code: 600,
					status: "Can't update order",
					err: order_update_err
				});
			}
			return res.send({
				success: true,
				code: 200,
				status: "Order update successful"
			});

		});

	});
};

exports.delete_order = function(req, res) {
	Order.remove({
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
			status: "Successfully delete this order"
		});
	});
};
