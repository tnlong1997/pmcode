const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../app');

let should = chai.should();

const usersTestData = require('../public/variables/users_test_data');

const databaseConfig = require('../../../config/database');

chai.use(chaiHttp);

before(function(done) {
	mockgoose.prepareStorage().then(function() {
		mongoose.connect(databaseConfig.dev, function(err) {
			done(err);
		});
	});
});

describe('Users Public Routes', () => {

	describe('/POST users sign up - successful', () => {

		it('it should create new user', (done) => {
			chai.request(app)
				.post('/public/users')
				.send(usersTestData.testUser)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					done();
				});
		});

	});

	describe('/POST users sign up - with errors', () => {

		it('it should not create user with preexisted email', (done) => {
			chai.request(app)
				.post('/public/users')
				.send(usersTestData.testUser)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(402);
					done();
				});
		});

		it('it should not create user with wrong email format', (done) => {
			chai.request(app)
				.post('/public/users')
				.send(usersTestData.wrongEmailFormatUser)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(402);
					done();
				});
		});

		it('it should not create user with no password', (done) => {
			chai.request(app)
				.post('/public/users')
				.send(usersTestData.noPasswordUser)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(402);
					done();
				});
		});

		it('it should not create user with no email', (done) => {
			chai.request(app)
				.post('/public/users')
				.send(usersTestData.noEmailUser)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(402);
					done();
				});
		});

		it('it should not create user with no last name', (done) => {
			chai.request(app)
				.post('/public/users')
				.send(usersTestData.noLastNameUser)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(402);
					done();
				});
		});

		it('it should not create user with no first name', (done) => {
			chai.request(app)
				.post('/public/users')
				.send(usersTestData.noFirstNameUser)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(402);
					done();
				});
		});

	});

});
