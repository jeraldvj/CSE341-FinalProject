const express = require('express');
const passport = require('passport');
const router = express.Router();

require('../extra/passport.js');



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

router.get('/login', (req, res, next) => {
    res.render('login');
});
    
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/api-docs',
    failureRedirect: '/login',
    failureFlash: true
}));

router.use('/', isLoggedIn, require('./swagger'));
router.use('/user', isLoggedIn, require('./user'));
router.use('/client', isLoggedIn, require('./client'));
router.use('/office', isLoggedIn, require('./office'));
router.use('/supplier', isLoggedIn, require('./supplier'));

router.get('/logout', (req, res) => {;
    req.session.destroy(err => {
        if (err) {
          res.status(400).send('Unable to log out')
        } else {
          res.redirect('/login');
        }
      });
  });

module.exports = router;