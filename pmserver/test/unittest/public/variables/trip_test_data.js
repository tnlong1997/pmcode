exports.testTrip = {
	departureDate: Date.now(),
	arrivalDate: Date.now(),
	from: 'vn',
	to: 'us',
};

exports.noDepartureDateTrip = {
	arrivalDate: Date.now(),
	from: 'vn',
	to: 'us',
};

exports.noArrivalDateTrip = {
	departureDate: Date.now(),
	from: 'vn',
	to: 'us',
};

exports.noFromTrip = {
	departureDate: Date.now(),
	arrivalDate: Date.now(),
	to: 'us',
};

exports.noToTrip = {
	departureDate: Date.now(),
	arrivalDate: Date.now(),
	from: 'vn',
};

exports.editTrip = {
	from: 'uk',
	to: 'fr',
};
