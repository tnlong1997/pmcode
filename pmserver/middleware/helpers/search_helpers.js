var Order = require('../../models/orderModel');

exports.find_suggested_order_with_search_string = function(req, res, callback) {
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
			callback(err_2, null);
		} else {
			callback(null, matched_orders);
		}
	});
};

exports.find_matched_order = function(req, res, matched_items, callback) {
	var result = [];
	var count = 0;
	var item;
	for (item = 0; item < matched_items.length; item++) {
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
			receiver_country: req.body.search_receiver_country,
			$comment: "Matched item queries"
		}, function(err_2, matched_orders) {
			if (err_2) {
				callback(err_2, null);
			}
			result = result.concat(matched_orders);
			++count;
			if (count == matched_items.length) {
				callback(null, result);
			}
		});
        
	}
};