const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Market = require("../models/Markets");

/* GET home page */
router.get("/", (req, res, next) => {
  const myQuery = req.query.manu;
  Market.find({})
    .then(markets => {
      if (myQuery !== undefined)
        markets = markets.filter(obj =>
          obj.marketname
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .toLowerCase()
            .split(" ")
            .includes(myQuery)
        );
      res.render("index", { markets });
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/", (req, res, next) => {
  Market.find({}).then(markets => {
    let inputValue = req.body[box1];
    let output = `The box was ${inputValue}`;
    if (checkedValue) return (output += "box was checked");
    else return (output += "was not checked");
  });
  res.render("index", { output });
});

// router.post("/search", (req, res) => {
//   console.log("-------", req.query.manu);
//   var searchValue = req.query.manu;
//   res.render("search", { searchString: searchValue });
// });

// router.post("/search", (req, res) => {
//   const searchValue = req.body.manu;
//   console.log(searchValue);
//   res.render("search", { searchString: searchValue });
// });
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
