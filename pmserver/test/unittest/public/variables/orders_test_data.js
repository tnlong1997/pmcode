exports.testOrder = {
	order_name: 'testOrder',
	item_name: 'testItem',
	item_description: 'test',
	item_price: 100,
	traveler_fee: 100,
	required_date_from: Date.now(),
	required_date_to: Date.now(),
	receiver_country: 1,
};

exports.createdTestOrder = {
	order_name: 'createdOrder',
	traveler_fee: 100,
	total_fee: 100,
	required_date_from: Date.now(),
	required_date_to: Date.now(),
	receiver_country: 1,
};

exports.noOrderNameOrder = {
	item_name: 'testItem',
	item_description: 'test',
	item_price: 100,
	traveler_fee: 100,
	required_date_from: Date.now(),
	required_date_to: Date.now(),
	receiver_country: 1,
};

exports.noItemNameOrder = {
	order_name: 'testOrder',
	item_description: 'test',
	item_price: 100,
	traveler_fee: 100,
	required_date_from: Date.now(),
	required_date_to: Date.now(),
	receiver_country: 1,
};

exports.noItemDescriptionOrder = {
	order_name: 'testOrder',
	item_name: 'testItem',
	item_price: 100,
	traveler_fee: 100,
	required_date_from: Date.now(),
	required_date_to: Date.now(),
	receiver_country: 1,
};

exports.noItemPriceOrder = {
	order_name: 'testOrder',
	item_name: 'testItem',
	item_description: 'test',
	traveler_fee: 100,
	required_date_from: Date.now(),
	required_date_to: Date.now(),
	receiver_country: 1,
};

exports.noTravelerFeeOrder = {
	order_name: 'testOrder',
	item_name: 'testItem',
	item_description: 'test',
	item_price: 100,
	required_date_from: Date.now(),
	required_date_to: Date.now(),
	receiver_country: 1,
};
