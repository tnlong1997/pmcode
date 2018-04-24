exports.testUser = {
	email: 'testUser@gmail.com',
	password: 'testUser',
	profile: {
		firstName: 'test',
		lastName: 'user',
	}
};

exports.wrongEmailFormatUser = {
	email: 'testUser',
	password: 'testUser',
	profile: {
		firstName: 'test',
		lastName: 'user',
	}
};

exports.noEmailUser = {
	password: 'testUser',
	profile: {
		firstName: 'test',
		lastName: 'user',
	}
};

exports.noPasswordUser = {
	email: 'testUser',
	profile: {
		firstName: 'test',
		lastName: 'user',
	}
};

exports.noLastNameUser = {
	email: 'testUser',
	password: 'testUser',
	profile: {
		firstName: 'test',
	}
};

exports.noFirstNameUser = {
	email: 'testUser',
	password: 'testUser',
	profile: {
		lastName: 'user',
	}
};
