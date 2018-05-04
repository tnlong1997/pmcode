var Trip = require('../models/tripModel');

exports.trip_list = function(req, res) {
	Trip.find().exec(function(db_err, trips) {
		if (db_err) {
			return res.send({
				success: false,
				code: 600,
				status: db_err
			});
		}

		if (trips.length == 0) {
			res.send({
				success: true,
				code: 200,
				status: "No trip in database"
			});
		} else {
			res.send({
				success: true,
				code: 200,
				status: "Trips list received",
				trips: trips
			});
		}
	});
};

exports.create_trip = function(req, res) {
	if (req.body.departure_date &&
		req.body.arrival_date &&
		req.body.departure_airport &&
		req.body.arrival_airport) {
		var owner_id = req.token._id;

		var new_trip = new Trip({
			departure_date: req.body.departure_date,
			arrival_date: req.body.arrival_date,
			departure_airport: req.body.departure_airport,
			arrival_airport: req.body.arrival_airport,
			user: owner_id
		});

		new_trip.validate(function(db_err) {
			if (db_err) {
				res.send({
					success: false,
					code: 600,
					status: "Database error",
					err: db_err
				});
			} else {
				new_trip.save(function(db_err_2) {
					if (db_err_2) {
						res.send({
							success: false,
							code: 600,
							status: "Database Error",
							err: db_err_2
						});
					}

					res.send({
						success: true,
						code: 200,
						status: "Trip created successfully",
						trip_id: new_trip
					});
				});
			}
		});
	} else {
		res.send({
			success: false,
			code: 400,
			status: "Missing Required Field"
		});
	}
};


exports.edit_trip = function(req, res) {
	Trip.findById(req.params.id, function(find_id_err, trip) {
		if (find_id_err) {
			return res.send({
				success: false,
				code: 601,
				status: "Database CastError",
				err: find_id_err
			});
		}
		trip.update(req.body, function(trip_update_err) {
			if (trip_update_err) {
				return res.send({
					success: false,
					code: 600,
					status: "Can't update trip",
					err: trip_update_err
				});
			}
			return res.send({
				success: true,
				code: 200,
				status: "Updated trip successfully"
			});

		});

	});
};

exports.delete_trip = function(req, res) {
	Trip.remove({_id: req.params.id}, function(db_err) {
		if (db_err) {
			return res.send({
				success: false,
				code: 600,
				status: "Database Error",
				err: db_err
			});
		}

		return res.send({
			success: true,
			code: 200,
			status: "Delete Trip successfully"
		});
	});
};
