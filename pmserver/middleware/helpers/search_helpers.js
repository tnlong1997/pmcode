var Order = require('../../models/orderModel');

exports.find_suggested_order_with_search_string = function(req, res) {
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
		return matched_orders;
	});
};

exports.find_matched_order = function(req, res, matched_items) {
	var result = [];
	for (var item in matched_items) {
		console.log(item);
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
            
			result = result.concat(matched_orders);
			console.log(result);
		});
	}
	return result;
};