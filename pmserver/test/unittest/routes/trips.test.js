const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const jwt = require('jsonwebtoken');
const secret = require('../../../config/secret');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../app');

const Trip = require('../../../models/tripModel');
const User = require('../../../models/userModel');

let should = chai.should();

const userTestData = require('../public/variables/users_test_data');
const tripTestData = require('../public/variables/trip_test_data');

const databaseConfig = require('../../../config/database');

chai.use(chaiHttp);

let createdUser;
let createdJWT = '';
let createdUserId;
let createdTripId;
let wrongJWT = 'wrongJWT';

describe('Trips Routes', function() {
	before(function(done) {
		mockgoose.prepareStorage().then(function() {
			mongoose.connect(databaseConfig.dev, function(err) {
				if (err) {
					throw err;
				}
				createdUser = new User(
					userTestData.createdTestUser
				);

				createdUser.save(function(err, user) {
					if (err) {
						throw (err);
					}

					createdUserId = user._id;
					createdJWT = jwt.sign({email: user.email, _id: user._id}, secret, {
						expiresIn: 10000000000000
					});
					done();
				});
			});
		});
	});

	describe('/POST create trip', function() {
		it('it should create new trip', function(done) {
			chai.request(app)
				.post('/protected/trips')
				.set({'jwt': createdJWT})
				.send(tripTestData.testTrip)
				.end(function(err, res) {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					createdTripId = res.body.tripId;
					done();
				});
		});

		it('it should not create new trip without token', function(done) {
			chai.request(app)
				.post('/protected/trips')
				.send(tripTestData.testTrip)
				.end(function(err, res) {
					res.should.have.status(200);
					res.body.code.should.be.eql(499);
					done();
				});
		});

		it('it should not create new trip with wrong token', function(done) {
			chai.request(app)
				.post('/protected/trips')
				.set({'jwt': wrongJWT})
				.send(tripTestData.testTrip)
				.end(function(err, res) {
					res.should.have.status(200);
					res.body.code.should.be.eql(498);
					done();
				});
		});

		it('it should not create new trip without departure date', function(done) {
			chai.request(app)
				.post('/protected/trips')
				.set({'jwt': createdJWT})
				.send(tripTestData.noDepartureDateTrip)
				.end(function(err, res) {
					res.should.have.status(200);
					res.body.code.should.be.eql(400);
					done();
				});
		});

		it('it should not create new trip without arrival date', function(done) {
			chai.request(app)
				.post('/protected/trips')
				.set({'jwt': createdJWT})
				.send(tripTestData.noArrivalDateTrip)
				.end(function(err, res) {
					res.should.have.status(200);
					res.body.code.should.be.eql(400);
					done();
				});
		});

		it('it should not create new trip without from', function(done) {
			chai.request(app)
				.post('/protected/trips')
				.set({'jwt': createdJWT})
				.send(tripTestData.noFromTrip)
				.end(function(err, res) {
					res.should.have.status(200);
					res.body.code.should.be.eql(400);
					done();
				});
		});

		it('it should not create new trip without to', function(done) {
			chai.request(app)
				.post('/protected/trips')
				.set({'jwt': createdJWT})
				.send(tripTestData.noToTrip)
				.end(function(err, res) {
					res.should.have.status(200);
					res.body.code.should.be.eql(400);
					done();
				});
		});
	});

	describe('/GET get trips', function() {
		it('it should get trips', function(done) {
			chai.request(app)
				.get('/protected/trips/' + createdUserId)
				.set({'jwt': createdJWT})
				.end(function(err, res) {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					done();
				});
		});

		it('it should not get trips without token', function(done) {
			chai.request(app)
				.get('/protected/trips/' + createdUserId)
				.end(function(err, res) {
					res.should.have.status(200);
					res.body.code.should.be.eql(499);
					done();
				});
		});

		it('it should not get trips with wrong token', function(done) {
			chai.request(app)
				.get('/protected/trips/' + createdUserId)
				.set({'jwt': wrongJWT})
				.end(function(err, res) {
					res.should.have.status(200);
					res.body.code.should.be.eql(498);
					done();
				});
		});
	});

	describe('/PUT edit trip', function() {
		it('it should update trip', function(done) {
			chai.request(app)
				.put('/protected/trips/' + createdTripId)
				.set({'jwt': createdJWT})
				.send(tripTestData.editTrip)
				.end(function(err, res) {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					done();
				});
		});

		it('it should not update trip without token', function(done) {
			chai.request(app)
				.put('/protected/trips/' + createdTripId)
				.send(tripTestData.editTrip)
				.end(function(err, res) {
					res.should.have.status(200);
					res.body.code.should.be.eql(499);
					done();
				});
		});

		it('it should not update trip with wrong token', function(done) {
			chai.request(app)
				.put('/protected/trips/' + createdTripId)
				.set({'jwt': wrongJWT})
				.send(tripTestData.editTrip)
				.end(function(err, res) {
					res.should.have.status(200);
					res.body.code.should.be.eql(498);
					done();
				});
		});
	});

	describe('/DEL delete trip', function() {
		it('it should delete trip', function(done) {
			chai.request(app)
				.delete('/protected/trips/' + createdTripId)
				.set({'jwt': createdJWT})
				.end(function(err, res) {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					done();
				});
		});

		it('it should not delete trip without token', function(done) {
			chai.request(app)
				.delete('/protected/trips/' + createdTripId)
				.end(function(err, res) {
					res.should.have.status(200);
					res.body.code.should.be.eql(499);
					done();
				});
		});

		it('it should not delete trip with wrong token', function(done) {
			chai.request(app)
				.delete('/protected/trips/' + createdTripId)
				.set({'jwt': wrongJWT})
				.end(function(err, res) {
					res.should.have.status(200);
					res.body.code.should.be.eql(498);
					done();
				});
		});
	});

	after(function(done) {
		mockgoose.helper.reset().then(function() {
			done();
		});
	});
});
