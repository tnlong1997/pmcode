var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.send('welcome to primor');
});

module.exports = router;
