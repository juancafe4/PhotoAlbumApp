const express = require('express');
const router = express.Router();

router.route('/albums', require('./albums'));
router.route('/photos', require('./photos'));
module.exports = router;
