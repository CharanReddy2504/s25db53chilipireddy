const express = require('express');
const passport = require('passport');
const router = express.Router();
const Crystal = require('../models/crystal');
const Account = require('../models/account');

// GET home page – Show all crystals
router.get('/', async function(req, res, next) {
  try {
    const allCrystals = await Crystal.find();
    res.render('index', {
      title: 'Crystal Collection',
      message: 'Explore the fascinating properties of crystals!',
      crystals: allCrystals,
      user: req.user
    });
  } catch (err) {
    next(err);
  }
});

// Register
router.get('/register', function(req, res) {
  res.render('register', {
    title: 'Crystal App Registration',
    message: 'Register a new account',
    user: req.user
  });
});

router.post('/register', function(req, res) {
  Account.findOne({ username: req.body.username })
    .then(function(user) {
      if (user) {
        return res.render('register', {
          title: 'Registration',
          message: 'User already exists',
          account: req.body.username
        });
      }

      const newAccount = new Account({ username: req.body.username });

      Account.register(newAccount, req.body.password, function(err, user) {
        if (err || !user) {
          return res.render('register', {
            title: 'Registration',
            message: 'Registration failed',
            account: req.body.username
          });
        }

        res.redirect('/');
      });
    })
    .catch(err => {
      return res.render('register', {
        title: 'Registration',
        message: 'Server error',
        account: req.body.username
      });
    });
});

// Login
router.get('/login', function(req, res) {
  res.render('login', {
    title: 'Crystal App Login',
    message: 'Login to your account',
    user: req.user
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

// Logout
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // clears session cookie
      res.redirect('/');
    });
  });
});


// Ping test
router.get('/ping', function(req, res) {
  res.status(200).send("pong");
});

module.exports = router;
