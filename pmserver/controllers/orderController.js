var Order = require('../models/orderModel');
var User = require('../models/userModel');
var item_helpers = require('../middleware/helpers/item_helpers');

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
		&& req.body.item_price
		&& req.body.required_date_from
		&& req.body.required_date_to
		&& req.body.receiver_country) {

		var buyerId = req.token._id;

		var new_item_id = item_helpers.create_item(req, res);

		var new_order = new Order({
			order_name: req.body.order_name,
			item: new_item_id,
			traveler_fee: req.body.traveler_fee,
			total_fee: 0,
			created_date_time: Date.now(),
			buyer: buyerId,
			required_date_from: req.body.required_date_from,
			required_date_to: req.body.required_date_to,
			receiver_country: req.body.receiver_country
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
						item_id: new_item_id
					});
				});
			}
		});
	} else {
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

		var updated_item_id = item_helpers.update_item(req, res, order.item);

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
				status: "Order update successful",
				order_id: order._id,
				item_id: updated_item_id
			});

		});

	});
};

exports.delete_order = function(req, res) {
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
		} else {
			item_helpers.change_item_status(req, res, order.item, 0);
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
		}
	});


	
};
