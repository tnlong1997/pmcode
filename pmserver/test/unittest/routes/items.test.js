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

describe('Items Routes', function() {

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

	describe('/GET items list', () => {

		it('it should return item list', (done) => {
			chai.request(app)
				.get('/protected/items')
				.set({'jwt': createdJWT})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					res.body.items.should.have.lengthOf(1);
					done();
				});
		});

		it('it should not return order list without token', (done) => {
			chai.request(app)
				.get('/protected/items')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(499);
					done();
				});
		});

		it('it should not return order list with wrong token', (done) => {
			chai.request(app)
				.get('/protected/items')
				.set({'jwt': wrongJWT})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(498);
					done();
				});
		});

	});

	describe('/POST create item', () => {
		it('it should create new item', (done) => {
			chai.request(app)
				.post('/protected/items')
				.set({'jwt': createdJWT})
				.send(itemsTestData.testItem)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					done();
				});
		});

		it('it should not create new item without token', (done) => {
			chai.request(app)
				.post('/protected/items')
				.send(itemsTestData.testItem)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(499);
					done();
				});
		});

		it('it should not create new item with wrong token', (done) => {
			chai.request(app)
				.post('/protected/items')
				.set({'jwt': wrongJWT})
				.send(itemsTestData.testItem)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(498);
					done();
				});
		});

		it('it should not create new item without item name', (done) => {
			chai.request(app)
				.post('/protected/items')
				.set({'jwt': createdJWT})
				.send(itemsTestData.noItemNameItem)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(400);
					done();
				});
		});

		it('it should not create new item without item description', (done) => {
			chai.request(app)
				.post('/protected/items')
				.set({'jwt': createdJWT})
				.send(itemsTestData.noItemDescriptionItem)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(400);
					done();
				});
		});

		it('it should not create new item without item price', (done) => {
			chai.request(app)
				.post('/protected/items')
				.set({'jwt': createdJWT})
				.send(itemsTestData.noItemPriceItem)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(400);
					done();
				});
		});

	});

	describe('/PUT update item', () => {
		it('it should update item', (done) => {
			chai.request(app)
				.put('/protected/items/' + createdItem._id)
				.set({'jwt': createdJWT})
				.send(itemsTestData.testItem)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					done();
				});
		});

		it('it should not update item without token', (done) => {
			chai.request(app)
				.put('/protected/items/' + createdItem._id)
				.send(itemsTestData.testItem)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(499);
					done();
				});
		});

		it('it should update item', (done) => {
			chai.request(app)
				.put('/protected/items/' + createdItem._id)
				.set({'jwt': wrongJWT})
				.send(itemsTestData.testItem)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(498);
					done();
				});
		});
	});

	describe('/DEL delete item', () => {
		it('it should delete item', (done) => {
			chai.request(app)
				.delete('/protected/items/' + createdItem._id)
				.set({'jwt': createdJWT})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(200);
					done();
				});
		});

		it('it should not delete item without token', (done) => {
			chai.request(app)
				.delete('/protected/items/' + createdItem._id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.code.should.be.eql(499);
					done();
				});
		});

		it('it should delete item with wrong token', (done) => {
			chai.request(app)
				.delete('/protected/items/' + createdItem._id)
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
