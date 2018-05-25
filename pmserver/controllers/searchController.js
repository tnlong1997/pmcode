var Item = require('../models/itemModel');
var search_helpers = require('../middleware/helpers/search_helpers');

exports.search = function(req, res) {
	if (req.body.search_item_price_gte
	&& req.body.search_item_price_lte
	&& req.body.search_traveler_fee_gte
	&& req.body.search_traveler_fee_lte
	&& req.body.search_date_gte
	&& req.body.search_date_lte
	&& req.body.search_receiver_country) {

		if (req.body.search_string) {
			Item.find({
				$text: {
					$search: req.body.search_string
				},
				item_price: { 
					$gte: req.body.search_item_price_gte, 
					$lte: req.body.search_item_price_lte
				}
			}, function(err, matched_items) {
				if (err) {
					res.send({
						success: false,
						code: 600,
						status: "Database Error Item",
					});
				}

				if (matched_items.length == 0) {
					var suggested_orders = search_helpers.find_suggested_order_with_search_string(req, res);
					if (suggested_orders.length == 0) {
						res.send({
							success: true,
							code: 200,
							status: "No matching order"
						});
					} else {
						res.send({
							success: true,
							code: 200,
							status: "Show suggestion orders",
							orders: suggested_orders
						});
					}
				} else {
					search_helpers.find_matched_order(req, res, matched_items, function(matched_orders) {
						if (matched_orders.length == 0) {
							res.send({
								success: true,
								code: 200,
								status: "No matching order"
							});
						} else {
							res.send({
								success: true,
								code: 200,
								status: "Show results",
								orders: matched_orders
							});
						}
					});
				}
			});
		} else {
			Item.find({
				item_price: { 
					$gte: req.body.search_item_price_gte, 
					$lte: req.body.search_item_price_lte
				}
			}, function(err, matched_items) {
				if (err) {
					res.send({
						success: false,
						code: 600,
						status: "Database Error Item",
					});
				}

				if (matched_items.length == 0) {
					res.send({
						success: true,
						code: 200,
						status: "No matching items"
					});
				} else {
					console.log(matched_items);
					search_helpers.find_matched_order(req, res, matched_items, function(matched_orders) {
						if (matched_orders.length == 0) {
							res.send({
								success: true,
								code: 200,
								status: "No matching order"
							});
						} else {
							res.send({
								success: true,
								code: 200,
								status: "Show results",
								orders: matched_orders
							});
						}
					});
				}
			});
		}

	} else {
		res.send({
			success: false,
			code: 400,
			status: "All field required!"
		});
	}
};