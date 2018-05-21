const nodemailer = require('nodemailer');
const debug = require('debug')('my-namespace');
const transporter = require('./transporters');

const gmailTransporter = transporter.gmailTransporter;

module.exports = function(receiverEmail, next) {
	var mailOptions = {
		from: 'Primor <primorinc@gmail.com>',
		to: receiverEmail,
		subject: 'Welcome to Primor',
		text: 'Text about signup...',
	};

	gmailTransporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			debug(err);
			debug('Error sending email');
			return next(err);
		}
		debug('Message sent: %s', info.messageId);
		// Preview only available when sending through an Ethereal account
		debug('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		next(null);
	});
};
