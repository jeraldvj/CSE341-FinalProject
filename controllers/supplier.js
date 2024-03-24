const db = require('../models');
const supplier = db.supplier;

exports.createSupplier = (req, res) => {
    const supplier = new Supplier(req.body);
    supplier
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the user.'
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
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
};

exports.getSupplier = (req, res) => {
    const supplierName = new ObjectId(req.params.supplierName);
    Supplier.find({ status: officeName })
      .then((data) => {
        if (data.length> 0){
          res.status(200).send(data);
        } else{
          res.status(404).send({ message: 'Supplier name not found.' });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
};