const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Market = require("../models/Markets");

/* GET home page */
router.get("/", (req, res, next) => {
  Market.find({})
    .then(markets => {
      res.render("index", { markets });
    })
    .catch(error => {
      console.log(error);
    });
});

const loginCheck = () => {
  return (req, res, next) => {
    if (req.session.user) next();
    else res.redirect("/login");
  };
};

router.get("/addmarket", loginCheck(), (req, res) => {
  res.render("addmarket");
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
