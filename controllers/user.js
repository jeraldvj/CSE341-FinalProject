const db = require('../models');
const User = db.user;
const passwordChecker = require('../extra/passComplexityCheck');

exports.createUser = (req, res) => {
    if (!req.body.username || !req.body.password) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = passwordChecker.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }

    const user = new User(req.body);
    user.password = user.encryptPassword(password);
    user
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
    User.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
};

exports.getUser = (req, res) => {
    const username = req.params.username;
    User.find({ username: username })
      .then((data) => {
        if (data.length> 0){
          res.status(200).send(data);
        } else{
          res.status(404).send({ message: 'Username not found.' });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
};