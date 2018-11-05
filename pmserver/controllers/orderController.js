var Order = require('../models/orderModel');
var User = require('../models/userModel');
var item_helpers = require('../middleware/helpers/item_helpers');
var notificationController = require("./notificationController");

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

exports.order_list_traveler = function(req, res) {
	var travelerId = req.token._id;

	Order.find({traveler: travelerId}).exec(function(err, orders) {
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

exports.order_list_buyer = function(req, res) {
	var buyerId = req.token._id;

	Order.find({buyer: buyerId}).exec(function(err, orders) {
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
		&& req.body.product_country
		&& req.body.receiver_country) {

		var buyerId = req.token._id;

		item_helpers.create_item(req, res, function(item_helper_err, item_id) {
			var new_order = new Order({
				order_name: req.body.order_name,
				item: item_id,
				traveler_fee: req.body.traveler_fee,
				total_fee: 0,
				created_date_time: Date.now(),
				buyer: buyerId,
				required_date_from: req.body.required_date_from,
				required_date_to: req.body.required_date_to,
				product_country: req.body.product_country,
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
						var optionDict = {};
						optionDict["order"] = new_order._id;
						var notification_message = "Your order have been created successfully";
						var notification_message_id = notificationController.notify(buyerId, optionDict, notification_message, res);

						return res.send({
							success: true,
							code: 200,
							status: "order and item created",
							notification_message: notification_message,
							notification_message_id: notification_message_id,
							order_id: new_order._id,
							item_id: item_id
						});
					});
				}
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

		item_helpers.update_item(req, res, order.item, function(err, item) {
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

			order.update(req.body, function(order_update_err) {
				if (order_update_err) {
					return res.send({
						success: false,
						code: 600,
						status: "Can't update order",
						err: order_update_err
					});
				}
				var optionDict = {};
				optionDict["order"] = order._id;
				var notification_message = "Your order have been updated successfully";
				var notification_message_id = notificationController.notify(req.params.id, optionDict, notification_message, res);

				return res.send({
					success: true,
					code: 200,
					status: "Order update successful",
					notification_message: notification_message,
					notification_message_id: notification_message_id,
					order_id: order._id,
					item_id: item._id
				});
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
			item_helpers.change_item_status(req, res, order.item, 0, function(err, item, status) {
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
						Order.remove({
							_id: req.params.id
						}, function(err, order) {
							if (err) {
								return res.send({
									success: false,
									code: 600,
									status: err
								});
							}
							var optionDict = {};
							optionDict["order"] = order._id;
							var notification_message = "Your order have been deleted successfully";
							var notification_message_id = notificationController.notify(req.params.id, optionDict, notification_message, res);

							return res.send({
								success: true,
								code: 200,
								notification_message: notification_message,
								notification_message_id: notification_message_id,
								status: "Successfully delete this order"
							});
						});
					}
				}
			});
		}
	});


	
};

