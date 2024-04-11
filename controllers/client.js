const db = require('../models');
const Client = db.client;

exports.createClient = (req, res) => {
  try {
    const client = new Client(req.body);
    client
      .save()
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the user.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAll = (req, res) => {
  try {
    Client.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getById = (req, res) => {
  try {
    const clientId = req.params.id;
    Client.find({ _id: clientId })
      .then((data) => {
        if (data.length> 0){
          res.status(200).send(data);
        } else{
          res.status(404).send({ message: 'Client not found.' });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateClient = async (req, res) => {
  try{
    const clientId = req.params.id;
    if (!clientId) {
      res.status(400).send({ message: 'Invalid Client ID' });
      return;
    }
    const update = {
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      birthday: req.body.birthday,
      profilePicture: req.body.profilePicture,
      status: req.body.status,
      procedureHistory: req.body.procedureHistory
    }
    const doc = await Client.findOneAndUpdate({ _id: clientId },update , {new: true, upsert: true, includeResultMetadata: true});
    if (doc.value instanceof Client){
      res.status(204).send(doc);
    } else {
      res.status(404).json(err || 'Client ID not found.');
    }
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while updating the client info.');
  }
};


exports.deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    if (!clientId) {
      res.status(400).send({ message: 'Invalid Client ID' });
      return;
    }
    const doc = await Client.deleteOne({ _id: clientId })
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