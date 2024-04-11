const db = require('../models');
const Supplier = db.supplier;

exports.createSupplier = (req, res) => {
    const supplier = new Supplier(req.body);
    supplier
      .save()
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the supplier.'
        });
      });
};

exports.getAll = (req, res) => {
    Supplier.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving suppliers.'
        });
      });
};

exports.getSupplier = (req, res) => {
    const supplierName = req.params.supplierName;
    Supplier.find({ supplierName: supplierName })
      .then((data) => {
        if (data.length> 0){
          res.status(200).send(data);
        } else{
          res.status(404).send({ message: 'Supplier name not found.' });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving suppliers.'
        });
      });
};

exports.updateSupplier = async (req, res) => {
  try{
    const supplierName = req.params.supplierName;
    if (!supplierName) {
      res.status(400).send({ message: 'Invalid Supplier Name' });
      return;
    }
    const update = {
      supplierName: req.body.supplierName,
      products: req.body.products
    }
    const doc = await Supplier.findOneAndUpdate({ supplierName: supplierName },update , {new: true, upsert: true, includeResultMetadata: true});
    if (doc.value instanceof Supplier){
      res.status(204).send(doc);
    } else {
      res.status(404).json(err || 'Supplier Name not found.');
    }
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while updating the supplier info.');
  }
};


exports.deleteSupplier = async (req, res) => {
  try {
    const supplierName = req.params.supplierName;
    if (!supplierName) {
      res.status(400).send({ message: 'Invalid Supplier Name' });
      return;
    }
    const doc = await Supplier.deleteOne({ supplierName: supplierName })
    .then((result) => {
      if (result.deletedCount> 0){
        res.status(200).send(result);
      } else{
        res.status(404).send({ message: 'Supplier Name not found.' });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while deleting the supplier.'
      });
    });
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the supplier.');
  }
};