var express = require('express');
var router = express.Router();

var tokenAuthentication = require('../middlewares/tokenAuthentication');

var users_protected = require('./users_protected');
// Add tokenAuthentication as middleware
router.use(tokenAuthentication);

router.get('/', function(req, res) {
	// For testing
	return res.send('Protected primor routes');
});

// router.use('/users', users_protected);

module.exports = router;
