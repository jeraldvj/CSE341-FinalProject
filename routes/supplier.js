const express = require('express');
const router = express.Router();

const supplierController = require('../controllers/supplier');

router.get('/', supplierController.getAll);

router.get('/:supplierName', supplierController.getSupplier);

router.post('/', supplierController.createSupplier);

module.exports = router;