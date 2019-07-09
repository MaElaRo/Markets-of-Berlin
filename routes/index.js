const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// router.get('/api/markets', (req, res, next) => {
//   Place.find({}).then(markets=>{
//   res.json(markets)
//   })
// })

module.exports = router;
