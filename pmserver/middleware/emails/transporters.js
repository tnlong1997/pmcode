const nodemailer = require('nodemailer');

exports.gmailTransporter = nodemailer.createTransport({
	service: 'gmail',
	secure: false,
	port: 25,
	auth: {
		user: 'primorinc@gmail.com',
		pass: 'primor123..',
	},
	tls: {
		rejectUnauthorized: false,
	}
});
