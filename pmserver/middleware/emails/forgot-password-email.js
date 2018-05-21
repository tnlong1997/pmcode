const nodemailer = require('nodemailer');
const debug = require('debug')('my-namespace');
const transporter = require('./transporters');

const gmailTransporter = transporter.gmailTransporter;

module.exports = function(receiverEmail, token, next) {
	var mailOptions = {
		from: 'Primor <primorinc@gmail.com>',
		to: receiverEmail,
		subject: 'Primor Password Reset',
		text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'localhost:3000/' + 'public/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n',
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
