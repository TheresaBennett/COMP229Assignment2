// File name: Express app portfolio
// Student’s Name: Theresa Bennett
// StudentID: 300909345
// Date: June 18th, 2023

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;