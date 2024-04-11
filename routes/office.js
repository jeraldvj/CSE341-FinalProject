const express = require('express');
const router = express.Router();

const officeController = require('../controllers/office');

router.get('/', officeController.getAll);

router.get('/:officeName', officeController.getOffice);

router.post('/', officeController.createOffice);

router.put('/:officeName', officeController.updateOffice);

router.delete('/:officeName', officeController.deleteOffice);

module.exports = router;