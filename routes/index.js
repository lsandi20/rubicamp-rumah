var express = require('express');
var router = express.Router();
var models = require('../models/index')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/house', function (req, res, next) {
  models.House.findAll({}).then((data) => {
    res.json(data);
  })
});

module.exports = router;
