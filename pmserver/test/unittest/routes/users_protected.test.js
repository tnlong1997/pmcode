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

var createdJWT = '';
var createdUser;

const wrongJWT = 'wrongToken';
const wrongId = 'wrongId';

chai.use(chaiHttp);

before(function(done) {
	mockgoose.prepareStorage().then(function() {
		mongoose.connect(databaseConfig.dev, function(err) {
			createdUser = new User(
				usersTestData.createdTestUser
			);

			createdUser.save(function(err, user) {
				if (err) {
					throw (err);
				}

				createdJWT = jwt.sign({email: user.email, _id: user._id}, secret, {
					expiresIn: 10000000000000
				});

			});

			done();
		});
	});
});

describe('User Protected Routes', () => {

	describe('/GET user list', () => {

		it('it should return user list', (done) => {
			chai.request(app)
				.get('/protected/users')
				.set({'jwt': createdJWT})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					res.body.data.should.be.an('array');
					res.body.data.should.have.lengthOf(1);
					console.log(res.body.data[0]._id);
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
				.set({'jwt': wrongJWT})
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
				.put('/protected/users/' + createdUser._id + '/password')
				.set({'jwt': createdJWT})
				.send({newPassword: 'newPassword'})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					done();
				});
		});

		it('it should not change user password without token', (done) => {
			chai.request(app)
				.put('/protected/users/' + createdUser._id + '/password')
				.send({newPassword: 'newPassword'})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(499);
					done();
				});
		});

		it('it should not change user password with wrong token', (done) => {
			chai.request(app)
				.put('/protected/users/' + createdUser._id + '/password')
				.set({'jwt': wrongJWT})
				.send({newPassword: 'newPassword'})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(498);
					done();
				});
		});

		it('it should not change user password with wrong id', (done) => {
			chai.request(app)
				.put('/protected/users/' + wrongId + '/password')
				.set({'jwt': createdJWT})
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
				.get('/protected/users/' + createdUser._id + '/profile')
				.set({'jwt': createdJWT})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					res.body.profile.should.exist;
					done();
				});
		});

		it('it shoud not return user profile without token', (done) => {
			chai.request(app)
				.get('/protected/users/' + createdUser._id + '/profile')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(499);
					done();
				});
		});

		it('it shoud not return user profile with wrong token', (done) => {
			chai.request(app)
				.get('/protected/users/' + createdUser._id + '/profile')
				.set({'jwt': wrongJWT})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(498);
					done();
				});
		});

		it('it shoud return user profile', (done) => {
			chai.request(app)
				.get('/protected/users/' + wrongId + '/profile')
				.set({'jwt': createdJWT})
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
				.put('/protected/users/' + createdUser._id + '/profile')
				.set({'jwt': createdJWT})
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
				.put('/protected/users/' + createdUser._id + '/profile')
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
				.put('/protected/users/' + createdUser._id + '/profile')
				.set({'jwt': wrongJWT})
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
				.put('/protected/users/' + wrongId + '/profile')
				.set({'jwt': createdJWT})
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
				.delete('/protected/users/' + createdUser._id)
				.set({'jwt': createdJWT})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					done();
				});
		});
	});

});
