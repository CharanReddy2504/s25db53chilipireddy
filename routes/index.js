const express = require('express');
const router = express.Router();
const Crystal = require('../models/crystal'); // make sure the path is correct

/* GET home page – Show all crystals */
router.get('/', async function(req, res, next) {
  try {
    const allCrystals = await Crystal.find();
    res.render('index', {
      title: '💎 Crystal Collection',
      message: 'Explore the fascinating properties of crystals!',
      crystals: allCrystals
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
