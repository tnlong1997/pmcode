var Order = require('../models/orderModel');

exports.search_name = function(req, res) {
	if (req.body.search_string) {
		Order.find({$text: {$search: req.body.search_string}}, function(err, docs) {
			if (err) {
				res.send({
					success: false,
					code: 400,
					status: "Database Error"
				});
			}

			if (docs.length == 0) {
				res.send({
					success: true,
					code: 200,
					status: "No matching order"
				});
			}
			
			res.send({
				success: true,
				code: 200,
				status: "Show results",
				docs: docs
			});
			
		});
	} else {
		res.send({
			success: false,
			code: 400,
			status: "Search string required!"
		});
	}
};