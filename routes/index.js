const express = require('express');
const router  = express.Router();
const mongoose = require("mongoose");
const Market = require ("../models/Markets");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/markets-of-berlin', (req, res, next) => {
  Market.find({})
    .then(marks => {
      res.render("test", { markets: marks });
    })
    .catch(error => {
      console.log(error)
    })
});

// router.get('/api/markets', (req, res, next) => {
//   Place.find({}).then(markets=>{
//   res.json(markets)
//   })
// })

module.exports = router;


