var express = require('express');
var router = express.Router();

var tokenAuthentication = require('../middlewares/tokenAuthentication');

// Add tokenAuthentication as middleware
router.use(tokenAuthentication);

router.get('/', function(req, res, next) {
  return res.send('Protected primor routes');
});

module.exports = router;
