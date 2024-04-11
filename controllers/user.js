const db = require('../models');
const User = db.user;
const passwordChecker = require('../extra/passComplexityCheck');

exports.createUser = (req, res) => {
  try {
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
    User.find({})
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

exports.getUser = (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateUser = async (req, res) => {
  try{
    const username = req.params.username;
    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = passwordChecker.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }

    const user = new User(req.body);

    const update = {
      username: req.params.username,
      password: user.encryptPassword(password),
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      specialty: req.body.specialty,
      profile: req.body.profile
    }
    const doc = await User.findOneAndUpdate({ username: username },update , {new: true, upsert: true, includeResultMetadata: true});
    if (doc.value instanceof User){
      res.status(204).send(doc);
    } else {
      res.status(404).json(err || 'Username not found.');
    }
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while updating the user.');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const username = req.params.username;
    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }
    const doc = await User.deleteOne({ username: username })
    .then((result) => {
      if (result.deletedCount> 0){
        res.status(200).send(result);
      } else{
        res.status(404).send({ message: 'Username not found.' });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while deleting the user.'
      });
    });
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the user.');
  }
};