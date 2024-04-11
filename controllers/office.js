const db = require('../models');
const Office = db.office;

exports.createOffice = (req, res) => {
    const office = new Office(req.body);
    office
      .save()
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the user.'
        });
      });
};

exports.getAll = (req, res) => {
    Office.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
};

exports.getOffice = (req, res) => {
    const officeName = req.params.officeName;
    Office.find({ officeName: officeName })
      .then((data) => {
        if (data.length> 0){
          res.status(200).send(data);
        } else{
          res.status(404).send({ message: 'Office name not found.' });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
};

exports.updateOffice = async (req, res) => {
  try{
    const officeName = req.params.officeName;
    if (!officeName) {
      res.status(400).send({ message: 'Invalid Office Name' });
      return;
    }
    const update = {
      officeName: req.params.officeName,
      ubication: req.body.ubication,
      inventory: req.body.inventory,
      order: req.body.order
    }
    const doc = await Office.findOneAndUpdate({ officeName: officeName },update , {new: true, upsert: true, includeResultMetadata: true});
    if (doc.value instanceof Office){
      res.status(204).send(doc);
    } else {
      res.status(404).json(err || 'Client ID not found.');
    }
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while updating the client info.');
  }
};


exports.deleteOffice = async (req, res) => {
  try {
    const officeName = req.params.officeName;
    if (!officeName) {
      res.status(400).send({ message: 'Invalid Client ID' });
      return;
    }
    const doc = await Office.deleteOne({ officeName: officeName })
    .then((result) => {
      if (result.deletedCount> 0){
        res.status(200).send(result);
      } else{
        res.status(404).send({ message: 'Client ID not found.' });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while deleting the client.'
      });
    });
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the client.');
  }
};