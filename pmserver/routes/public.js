var express = require('express');
var router = express.Router();

// router.use('/users', users_public);

router.get('/', function(req, res) {
	res.send("Welcome to primor public routes");
});

module.exports = router;
