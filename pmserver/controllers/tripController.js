let Trip = require('../models/tripModel');
let User = require('../models/userModel');

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

exports.get_trips = function(req, res) {
	let shipperId = req.params.id;

	User.findById(shipperId, 'currentTrips')
		.populate('currentTrips')
		.exec(function(err, trips) {
			if (err) {
				return res.send({
					success: false,
					code: 600,
					status: "Database error",
					err: err,
				});
			}

			return res.send({
				success: true,
				code: 200,
				status: "Received current trips",
				currentTrips: trips.currentTrips,
			});
		});
};

exports.create_trip = function(req, res) {
	if (req.body.departureDate
		&& req.body.arrivalDate
		&& req.body.from
		&& req.body.to) {

		let shipperId = req.token._id;
		let newTrip = new Trip({
			departureDate: req.body.departureDate,
			arrivalDate: req.body.arrivalDate,
			from: req.body.from,
			to: req.body.to,
		});

		newTrip.validate(function(err) {
			if (err) {
				return res.send({
					success: false,
					code: 600,
					status: "Database error",
					err: err,
				});
			} 

			newTrip.save(function(err, trip) {
				if (err) {
					return res.send({
						success: false,
						code: 600,
						status: "Database Error",
						err: err,
					});
				}

				User.findByIdAndUpdate(shipperId, {$addToSet: {currentTrips: trip._id}}, function(err) {
					if (err) {
						return res.send({
							success: false,
							code: 600,
							err: err,
						});
					}

					return res.send({
						success: true,
						code: 200,
						status: "Trip created successfully",
						tripId: trip._id,
					});
				});
			});
		});
	} else {
		return res.send({
			success: false,
			code: 400,
			status: "Missing Required Field"
		});
	}
};


exports.edit_trip = function(req, res) {
	Trip.findById(req.params.id, function(err, trip) {
		if (err) {
			return res.send({
				success: false,
				code: 600,
				status: "Database CastError",
				err: err
			});
		}

		if (!trip) {
			return res.send({
				success: false,
				code: 601,
				status: "Can't find item"
			});
		}

		trip.update(req.body, function(err) {
			if (err) {
				return res.send({
					success: false,
					code: 600,
					status: "Can't update trip",
					err: err
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
	Trip.remove({_id: req.params.id}, function(err) {
		if (err) {
			return res.send({
				success: false,
				code: 600,
				status: "Database Error",
				err: err,
			});
		}

		return res.send({
			success: true,
			code: 200,
			status: "Delete Trip successfully"
		});
	});
};
