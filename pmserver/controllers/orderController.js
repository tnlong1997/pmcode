var Order = require('../models/orderModel');
var Item = require('../models/itemModel');

exports.order_list = function(req, res, next){
	Order.find().exec(function(err, orders){
		if(err){
			return next(err);
		}

		if(orders.length == 0){
			res.send({
				status: "no order in database"
			});
		}else{
			res.send({
				status : "success",
				orders : orders
			});
		}
	});
}

exports.create_order = function(req, res, next){
	if(req.body.order_name 
		&& req.body.traveler_fee 
		&& req.body.item_name
		&& req.body.item_description
		&& req.body.item_price){

		//create new Item
		var new_item = new Item({
			item_name : req.body.item_name,
			item_description : req.body.item_description,
			item_price : req.body.item_price
		});

		new_item.save(function(error, item){
			if(error){ //this error contains duplicated key.
				return next(error);
			}
		});

		var new_order = new Order({
			order_name : req.body.order_name,
			item : new_item._id,
			traveler_fee : req.body.traveler_fee,
			total_fee : 0,
			created_date_time : Date.now()
		});

		new_order.save(function(order_error, order){
			if(order_error){
				return next(order_error);
			}else{
				res.send({
					status: "success",
					order_id : new_order._id,
					item_id : new_item._id
				});

			}
		});
	}else{
		// Error handler in future.
		// var err = new Error("All fields required");
		// err.status = 400;
		// return next(err);
		res.send({
			status: "all fields required"
		});
	}
}