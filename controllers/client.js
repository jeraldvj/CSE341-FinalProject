const db = require('../models');
const Client = db.client;

exports.createClient = (req, res) => {
    const client = new Client(req.body);
    client
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
    Client.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
};

exports.getById = (req, res) => {
    const clientId = new ObjectId(req.params.id);
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
};

exports.findByStatus = (req, res) => {
    const status = new ObjectId(req.params.status);
    Client.find({ status: status })
      .then((data) => {
        if (data.length> 0){
          res.status(200).send(data);
        } else{
          res.status(404).send({ message: 'Client status not found.' });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
};

exports.findByLastName = (req, res) => {
    const lastName = new ObjectId(req.params.lastName);
    Client.find({ status: lastName })
      .then((data) => {
        if (data.length> 0){
          res.status(200).send(data);
        } else{
          res.status(404).send({ message: 'Client last name not found.' });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
};