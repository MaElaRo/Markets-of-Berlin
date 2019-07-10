const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Market = require("../models/Markets");

// const geo = require ("mapbox-geocoding");
// geo.setAccessToken('pk.eyJ1IjoiYW5nbWluc2hlbmciLCJhIjoiY2pydDhjMjlwMXhpaDN5cHMxcjNya2ZmbyJ9.Tc5kmo0vZ1VKJbLK83OloA');

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

router.post("/addmarket", (req, res, next) => {
  const {
    marketname,
    marketType,
    description,
    keywords,
    day,
    openingHours,
    closingHours
  } = req.body;

// let opTime = 
console.log(marketname,
  marketType,
  description,
  keywords,
  day,
  openingHours,
  closingHours)
  
  Market.create({
    marketname,
    market: {
      marketType: marketType
    },
    // address: {

    // },
    description,
    keywords
    //openingTime: day, 
      // openingHours: openingHours,
      // closingHours: closingHours
  

  })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log("Error while adding a market: ", err);
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
