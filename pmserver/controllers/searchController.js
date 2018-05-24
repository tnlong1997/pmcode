var Order = require('../models/orderModel');
var Item = require('../models/itemModel');

exports.search_order_name = function(req, res) {
	if (req.body.search_string) {
		Order.find({
			$text: {
				$search: req.body.search_string
			}
		}, function(err, orders) {
			if (err) {
				res.send({
					success: false,
					code: 600,
					status: "Database Error"
				});
			}

			if (orders.length == 0) {
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
					orders: orders
				});
			}
		});
	} else {
		res.send({
			success: false,
			code: 400,
			status: "Search string required!"
		});
	}
};

exports.search_item_name = function(req, res) {
	if (req.body.search_string) {
		Item.find({
			$text: {
				$search: req.body.search_string
			}
		}, function(err, items) {
			if (err) {
				res.send({
					success: false,
					code: 600,
					status: "Database Error"
				});
			}

			if (items.length == 0) {
				res.send({
					success: true,
					code: 200,
					status: "No matching item	"
				});
			} else {			
				res.send({
					success: true,
					code: 200,
					status: "Show results",
					items: items
				});
			}
		});
	} else {
		res.send({
			success: false,
			code: 400,
			status: "Search string required!"
		});
	}
};

exports.search_item_price = function(req, res) {
	if (req.body.search_price_gte && req.body.search_price_lte) {
		Item.find({
			item_price: { 
				$gte: req.body.search_price_gte, 
				$lte: req.body.search_price_lte
			}
		}, function(err, items) {
			if (err) {
				res.send({
					success: false,
					code: 600,
					status: "Database Error"
				});
			}
			if (items.length == 0) {
				res.send({
					success: true,
					code: 200,
					status: "No matching item"
				});
			} else {			
				res.send({
					success: true,
					code: 200,
					status: "Show results",
					items: items
				});
			}
		});
	} else {
		res.send({
			success: false,
			code: 400,
			status: "Range required!"
		});
	}
	
};

exports.search_traveler_fee = function(req, res) {
	if (req.body.search_price_gte && req.body.search_price_lte) {
		Order.find({
			traveler_fee: { 
				$gte: req.body.search_price_gte, 
				$lte: req.body.search_price_lte
			},
			$comment: "Include range from input"
		}, function(err, orders) {
			if (err) {
				res.send({
					success: false,
					code: 600,
					status: "Database Error"
				});
			}
			if (orders.length == 0) {
				res.send({
					success: true,
					code: 200,
					status: "No matching item"
				});
			} else {			
				res.send({
					success: true,
					code: 200,
					status: "Show results",
					orders: orders
				});
			}
		});
	} else {
		res.send({
			success: false,
			code: 400,
			status: "Range required!"
		});
	}
	
};

exports.search_date = function(req, res) {
	if (req.body.search_date_gte && req.body.search_date_lte) {
		Order.find({
			required_date_from: {
				$not: { $gt: req.body.search_date_lte }
			},
			required_date_to: {
				$not: { $lt: req.body.search_date_gte }
			},
			$comment: "Don't allow unmatched date between input and database"
		}, function(err, orders) {
			if (err) {
				res.send({
					success: false,
					code: 600,
					status: "Database Error"
				});
			}

			if (orders.length == 0) {
				res.send({
					success: true,
					code: 200,
					status: "No matching item"
				});
			} else {			
				res.send({
					success: true,
					code: 200,
					status: "Show results",
					orders: orders
				});
			}
		});
	} else {
		res.send({
			success: false,
			code: 400,
			status: "Range required!"
		});
	}
};

exports.search_receiver_country = function(req, res) {
	if (req.body.search_country) {
		Order.find({
			receiver_country: req.body.search_country
		}, function(err, orders) {
			if (err) {
				res.send({
					success: false,
					code: 600,
					status: "Database Error"
				});
			}

			if (orders.length == 0) {
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
					orders: orders
				});
			}


		});
	} else {
		res.send({
			success: false,
			code: 400,
			status: "Country code!"
		});
	}
};