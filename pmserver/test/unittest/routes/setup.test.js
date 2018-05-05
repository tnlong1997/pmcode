const prepare = require('mocha-prepare');

const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const jwt = require('jsonwebtoken');
const secret = require('../../../config/secret');

const User = require('../../../models/userModel');
const Order = require('../../../models/orderModel');
const Item = require('../../../models/itemModel');

const databaseConfig = require('../../../config/database');

const usersTestData = require('../public/variables/users_test_data');
const ordersTestData = require('../public/variables/orders_test_data');
const itemsTestData = require('../public/variables/items_test_data');

before(function(done) {

	global.wrongJWT = 'wrongToken';
	global.wrongID = 'wrongID';

	mockgoose.prepareStorage().then(function() {
		mongoose.connect(databaseConfig.dev, function(err) {

			if (err) {
				throw err;
			}

			global.createdUser = new User(
				usersTestData.createdTestUser
			);

			global.createdItem = new Item(
				itemsTestData.createdTestItem
			);

			global.createdUser.save(function(err, user) {
				if (err) {
					throw (err);
				}

				global.createdJWT = jwt.sign({email: user.email, _id: user._id}, secret, {
					expiresIn: 10000000000000
				});

				global.createdItem.save(function(err) {
					if (err) {
						throw (err);
					}

					ordersTestData.createdTestOrder.item = global.createdItem._id;
					ordersTestData.createdTestOrder.buyer = global.createdUser._id;

					global.createdOrder = new Order(
						ordersTestData.createdTestOrder
					);

					global.createdOrder.save(function(err) {
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

// it('setup is done', (done) => {
// 	done();
// });
