const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const jwt = require('jsonwebtoken');
const secret = require('../../../config/secret');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../app');

const User = require('../../../models/userModel');

let should = chai.should();

const usersTestData = require('../public/variables/users_test_data');

const databaseConfig = require('../../../config/database');

chai.use(chaiHttp);

describe('User Protected Routes', function() {

	describe('/GET user list', () => {

		it('it should return user list', (done) => {
			chai.request(app)
				.get('/protected/users')
				.set({'jwt': global.createdJWT})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					res.body.data.should.be.an('array');
					res.body.data.should.have.lengthOf(1);
					done();
				});
		});

		it('it should not return user list without token', (done) => {
			chai.request(app)
				.get('/protected/users')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(499);
					done();
				});
		});

		it('it should not return user list with wrong token', (done) => {
			chai.request(app)
				.get('/protected/users')
				.set({'jwt': global.wrongJWT})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(498);
					done();
				});
		});

	});

	describe('/PUT user change password', () => {

		it('it should change user password', (done) => {
			chai.request(app)
				.put('/protected/users/' + global.createdUser._id + '/password')
				.set({'jwt': global.createdJWT})
				.send({newPassword: 'newPassword'})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					done();
				});
		});

		it('it should not change user password without token', (done) => {
			chai.request(app)
				.put('/protected/users/' + global.createdUser._id + '/password')
				.send({newPassword: 'newPassword'})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(499);
					done();
				});
		});

		it('it should not change user password with wrong token', (done) => {
			chai.request(app)
				.put('/protected/users/' + global.createdUser._id + '/password')
				.set({'jwt': global.wrongJWT})
				.send({newPassword: 'newPassword'})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(498);
					done();
				});
		});

		it('it should not change user password with wrong id', (done) => {
			chai.request(app)
				.put('/protected/users/' + global.wrongId + '/password')
				.set({'jwt': global.createdJWT})
				.send({newPassword: 'newPassword'})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(600);
					done();
				});
		});

	});

	describe('/GET user profile', () => {
		it('it shoud return user profile', (done) => {
			chai.request(app)
				.get('/protected/users/' + global.createdUser._id + '/profile')
				.set({'jwt': global.createdJWT})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					res.body.profile.should.exist;
					done();
				});
		});

		it('it shoud not return user profile without token', (done) => {
			chai.request(app)
				.get('/protected/users/' + global.createdUser._id + '/profile')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(499);
					done();
				});
		});

		it('it shoud not return user profile with wrong token', (done) => {
			chai.request(app)
				.get('/protected/users/' + global.createdUser._id + '/profile')
				.set({'jwt': global.wrongJWT})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(498);
					done();
				});
		});

		it('it shoud return user profile', (done) => {
			chai.request(app)
				.get('/protected/users/' + global.wrongId + '/profile')
				.set({'jwt': global.createdJWT})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(600);
					done();
				});
		});

	});

	describe('/PUT user update profile', () => {

		it('it should update user profile', (done) => {
			chai.request(app)
				.put('/protected/users/' + global.createdUser._id + '/profile')
				.set({'jwt': global.createdJWT})
				.send({
					profile: {
						lastName: 'new name',
						firstName: 'new name'
					}
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					done();
				});
		});

		it('it should not update user profile without token', (done) => {
			chai.request(app)
				.put('/protected/users/' + global.createdUser._id + '/profile')
				.send({
					profile: {
						lastName: 'new name',
						firstName: 'new name'
					}
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(499);
					done();
				});
		});

		it('it should not update user profile with wrong token', (done) => {
			chai.request(app)
				.put('/protected/users/' + global.createdUser._id + '/profile')
				.set({'jwt': global.wrongJWT})
				.send({
					profile: {
						lastName: 'new name',
						firstName: 'new name'
					}
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(498);
					done();
				});
		});

		it('it should not update user profile with wrong user id', (done) => {
			chai.request(app)
				.put('/protected/users/' + global.wrongId + '/profile')
				.set({'jwt': global.createdJWT})
				.send({
					profile: {
						lastName: 'new name',
						firstName: 'new name'
					}
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(600);
					done();
				});
		});

	});

	describe('/DEL delete user', function() {
		it('it should delete users', (done) => {
			chai.request(app)
				.delete('/protected/users/' + global.createdUser._id)
				.set({'jwt': global.createdJWT})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					done();
				});
		});
	});

	after(function(done) {
		mongoose.connection.db.dropDatabase(done);
	});

});
