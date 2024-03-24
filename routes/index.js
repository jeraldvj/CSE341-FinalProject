const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/user', require('./user'));
router.use('/client', require('./client'));
router.use('/office', require('./office'));
router.use('/supplier', require('./supplier'));

module.exports = router;