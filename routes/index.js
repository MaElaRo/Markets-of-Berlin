const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
<<<<<<< HEAD
const Market = require("../models/Markets");

/* GET home page */
=======
const Market = require ("../models/Markets");
const hbs = require("hbs");

//Helper function to parse and display data on index
hbs.registerHelper("JSON", data => JSON.stringify(data));

/* GET home page */
// router.get('/', (req, res, next) => {
//   res.render('index');
// });

/* GET home page */
>>>>>>> f24408f4de4b58a1ba15e5ad425f04a5ac51e08d
router.get("/", (req, res, next) => {
  Market.find({})
    .then(markets => {
      res.render("index", { markets });
    })
<<<<<<< HEAD
    .catch(error => {
      console.log(error);
=======
    .catch(err => {
      console.log("Error while retrieving the markets: ", err);
>>>>>>> f24408f4de4b58a1ba15e5ad425f04a5ac51e08d
    });
});

// router.get('/markets-of-berlin', (req, res, next) => {
//   Market.find({})
//     .then(marks => {
//       res.render("test", { markets: marks });
//     })
//     .catch(error => {
//       console.log(error)
//     })
// });

// router.get('/api/markets', (req, res, next) => {
//   Place.find({}).then(markets=>{
//   res.json(markets)
//   })
// })

module.exports = router;
