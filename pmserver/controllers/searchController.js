var Order = require('../models/orderModel');
var Item = require('../models/itemModel');

exports.search = function(req, res) {
	if (req.body.search_string 
	&& req.body.search_item_price_gte
	&& req.body.search_item_price_lte
	&& req.body.search_traveler_fee_gte
	&& req.body.search_traveler_fee_lte
	&& req.body.search_date_gte
	&& req.body.search_date_lte
	&& req.body.search_receiver_country) {

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
				console.log(1);
				Order.find({
					$text: {
						$search: req.body.search_string
					},
					traveler_fee: { 
						$gte: req.body.search_traveler_fee_gte, 
						$lte: req.body.search_traveler_fee_lte
					},
					required_date_from: {
						$not: { $gt: req.body.search_date_lte }
					},
					required_date_to: {
						$not: { $lt: req.body.search_date_gte }
					},
					receiver_country: req.body.search_country,
					$comment: "Suggestion queries"
				}, function(err_2, matched_orders) {
					if (err_2) {
						res.send({
							success: false,
							code: 600,
							status: "Database Error Suggestion"
						});
					}

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
							status: "Show suggestion orders",
							orders: matched_orders
						});
					}
				});

			} else {
				for (var item in matched_items) {
					Order.find({
						item: matched_items[item]._id,
						traveler_fee: { 
							$gte: req.body.search_traveler_fee_gte, 
							$lte: req.body.search_traveler_fee_lte
						},
						required_date_from: {
							$not: { $gt: req.body.search_date_lte }
						},
						required_date_to: {
							$not: { $lt: req.body.search_date_gte }
						},
						receiver_country: req.body.search_country,
						$comment: "Matched item queries"
					}, function(err_2, matched_orders) {
						if (err_2) {
							res.send({
								success: false,
								code: 600,
								status: "Database Error Matched"
							});
						}
						
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
			}
		});

	} else {
		res.send({
			success: false,
			code: 400,
			status: "All field required!"
		});
	}
};