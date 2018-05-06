exports.testOrder = {
	order_name: 'testOrder',
	item_name: 'testItem',
	item_description: 'test',
	item_price: 100,
	traveler_fee: 100,
};

exports.createdTestOrder = {
	order_name: 'createdOrder',
	traveler_fee: 100,
	total_fee: 100,
};

exports.noOrderNameOrder = {
	item_name: 'testItem',
	item_description: 'test',
	item_price: 100,
	traveler_fee: 100,
};

exports.noItemNameOrder = {
	order_name: 'testOrder',
	item_description: 'test',
	item_price: 100,
	traveler_fee: 100,
};

exports.noItemDescriptionOrder = {
	order_name: 'testOrder',
	item_name: 'testItem',
	item_price: 100,
	traveler_fee: 100,
};

exports.noItemPriceOrder = {
	order_name: 'testOrder',
	item_name: 'testItem',
	item_description: 'test',
	traveler_fee: 100,
};

exports.noTravelerFeeOrder = {
	order_name: 'testOrder',
	item_name: 'testItem',
	item_description: 'test',
	item_price: 100,
};
