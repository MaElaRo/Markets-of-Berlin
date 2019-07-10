const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Market = require("../models/Markets");

const geo = require ("mapbox-geocoding");
geo.setAccessToken('pk.eyJ1IjoiYW5nbWluc2hlbmciLCJhIjoiY2pydDhjMjlwMXhpaDN5cHMxcjNya2ZmbyJ9.Tc5kmo0vZ1VKJbLK83OloA');

/* GET home page */
router.get("/", (req, res, next) => {
  Market.find({})
    .then(markets => {
      console.log(markets[markets.length - 1])
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
    address,
    description,
    keywords,
    day,
    openingHours,
    closingHours
  } = req.body;

  let opHours = openingHours.filter(elem => elem !== "");
  let cloHours = closingHours.filter(elem => elem !== "");
  let opTime =
    typeof day === "string"
      ? [
          {
            day: day,
            openingHours: opHours[0],
            closingHours: cloHours[0]
          }
        ]
      : day.map((elem, index) => {
          return {
            day: elem,
            openingHours: opHours[index],
            closingHours: cloHours[index]
          };
        });

  geo.geocode('mapbox.places', address, function (err, geoData) {

  Market.create({
    marketname,
    market: {
      marketType: marketType
    },
    location: {
      formType: "Point",
      coordinates: geoData.features[0].geometry.coordinates.reverse(),
    },
    description,
    keywords,
    openingTime: opTime
  })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log("Error while adding a market: ", err);
    });
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
