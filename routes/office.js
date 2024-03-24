const express = require('express');
const router = express.Router();

const officeController = require('../controllers/office');

router.get('/', officeController.getAll);

router.get('/:officeName', officeController.getOffice);

router.post('/', officeController.createOffice);

module.exports = router;