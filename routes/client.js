const express = require('express');
const router = express.Router();

const clientController = require('../controllers/client');

router.get('/', clientController.getAll);

router.get('/:id', clientController.getById);

router.get('/:status', clientController.findByStatus);

router.get('/:lastName', clientController.findByLastName);

router.post('/', clientController.createClient);

module.exports = router;