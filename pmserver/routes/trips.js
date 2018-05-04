var express = require('express');
var router = express.Router();

const tripController = require('../controllers/tripController');

router.get('/', tripController.trip_list);

router.post('/', tripController.create_trip);

router.put('/:id', tripController.edit_trip);

router.delete('/:id', tripController.delete_trip);

module.exports = router;