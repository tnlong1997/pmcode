const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const jwt = require('jsonwebtoken');
const secret = require('../../../config/secret');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../app');

const User = require('../../../models/userModel');
const Order = require('../../../models/orderModel');
const Item = require('../../../models/itemModel');

let should = chai.should();

const usersTestData = require('../public/variables/users_test_data');
const ordersTestData = require('../public/variables/orders_test_data');
const itemsTestData = require('../public/variables/items_test_data');

const databaseConfig = require('../../../config/database');

chai.use(chaiHttp);

var createdUser;
var createdOrder;
var createdItem;
var createdJWT = '';
var wrongJWT = 'wrongToken';
var wrongID = 'wrongID';


describe('Order Routes', function() {

	before(function(done) {

		mockgoose.prepareStorage().then(function() {
			mongoose.connect(databaseConfig.dev, function(err) {

				if (err) {
					throw err;
				}

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

					itemsTestData.createdTestItem.buyer = createdUser._id;

					createdItem = new Item(
						itemsTestData.createdTestItem
					);

					createdItem.save(function(err) {
						if (err) {
							throw (err);
						}

						ordersTestData.createdTestOrder.item = createdItem._id;
						ordersTestData.createdTestOrder.buyer = createdUser._id;

						createdOrder = new Order(
							ordersTestData.createdTestOrder
						);

						createdOrder.save(function(err) {
							if (err) {
								throw (err);
							}

							done();
						});
					});
				});
			});
		});
	});

	describe('/GET order list', () => {

		it('it should return order list', (done) => {
			chai.request(app)
				.get('/protected/orders')
				.set({'jwt': createdJWT})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					res.body.orders.should.have.lengthOf(1);
					done();
				});
		});

		it('it should not return order list without token', (done) => {
			chai.request(app)
				.get('/protected/orders')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(499);
					done();
				});
		});

		it('it should not return order list with wrong token', (done) => {
			chai.request(app)
				.get('/protected/orders')
				.set({'jwt': wrongJWT})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(498);
					done();
				});
		});

	});

	describe('/POST order create', () => {

		it('it should create new order', (done) => {

			chai.request(app)
				.post('/protected/orders')
				.set({'jwt': createdJWT})
				.send(ordersTestData.testOrder)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					done();
				});
		});

		it('it should not create order without token', (done) => {
			chai.request(app)
				.post('/protected/orders')
				.send(ordersTestData.testOrder)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(499);
					done();
				});
		});

		it('it should not create order with wrong token', (done) => {
			chai.request(app)
				.post('/protected/orders')
				.set({'jwt': wrongJWT})
				.send(ordersTestData.testOrder)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(498);
					done();
				});
		});

		it('it should not create order without order name', (done) => {
			chai.request(app)
				.post('/protected/orders')
				.set({'jwt': createdJWT})
				.send(ordersTestData.noOrderNameOrder)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(400);
					done();
				});
		});

		it('it should not create order without item name', (done) => {
			chai.request(app)
				.post('/protected/orders')
				.set({'jwt': createdJWT})
				.send(ordersTestData.noItemNameOrder)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(400);
					done();
				});
		});

		it('it should not create order without item price', (done) => {
			chai.request(app)
				.post('/protected/orders')
				.set({'jwt': createdJWT})
				.send(ordersTestData.noItemPriceOrder)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(400);
					done();
				});
		});

		it('it should not create order without traveler fee', (done) => {
			chai.request(app)
				.post('/protected/orders')
				.set({'jwt': createdJWT})
				.send(ordersTestData.noTravelerFeeOrder)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(400);
					done();
				});
		});

	});

	describe('/PUT order edit', () => {
		it('it should update order', (done) => {

			chai.request(app)
				.put('/protected/orders/' + createdOrder._id)
				.set({'jwt': createdJWT})
				.send(ordersTestData.createdTestOrder)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					done();
				});
		});

		it('it should not update order without token', (done) => {
			chai.request(app)
				.put('/protected/orders/' + createdOrder._id)
				.send(ordersTestData.createdTestOrder)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(499);
					done();
				});
		});

		it('it should not update order with wrong token', (done) => {
			chai.request(app)
				.put('/protected/orders/' + createdOrder._id)
				.set({'jwt': wrongJWT})
				.send(ordersTestData.createdTestOrder)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(498);
					done();
				});
		});
	});

	describe('/DEL order delete', () => {
		it('it should delete order', (done) => {
			chai.request(app)
				.delete('/protected/orders/' + createdOrder._id)
				.set({'jwt': createdJWT})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					done();
				});
		});

		it('it should not delete order without token', (done) => {
			chai.request(app)
				.delete('/protected/orders/' + createdOrder._id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(499);
					done();
				});
		});

		it('it should not delete order with wrong token', (done) => {
			chai.request(app)
				.delete('/protected/orders/' + createdOrder._id)
				.set({'jwt': wrongJWT})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(498);
					done();
				});
		});

	});

	after(function(done) {
		mockgoose.helper.reset().then(() => {
			done();
		});
	});

});
