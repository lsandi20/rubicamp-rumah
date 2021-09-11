var express = require('express');
var router = express.Router();
var models = require('../models/index')
const { Op } = require('sequelize')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/house', function (req, res, next) {
  let url = req.originalUrl.split('/house').pop().split('?').pop();
  let sort = {
    prop: '',
    rule: ''
  }
  if (!(url.includes('sort'))) {
    sort.prop = 'id';
    sort.rule = 'ASC';
  } else {
    sort.prop = req.query.sortp;
    sort.rule = req.query.sortr;
    url = url.split(`&sortp=${req.query.sortp}&sortr=${req.query.sortr}`).join('')
  }
  url = url.split(`page=${req.query.page}`);
  while (url.length > 1) {
    if (url[0].includes(`page`) || url[0].length === 0) {
      url.shift();
    }
  }
  url = url.join();
  if (url[0] === '&') {
    url = url.slice(1);
  }
  if (url.length === 1) {
    url = ''
  }
  let query = {
    id: req.query.checkid && req.query.id ? parseInt(req.query.id) : null,
    name: req.query.checkname && req.query.name ? { [Op.iLike]: `%${req.query.name.toLowerCase()}%` } : null,
    type: req.query.checktype && req.query.type ? parseInt(req.query.type) : null,
    price: req.query.checkprice && req.query.price ? parseInt(req.query.price) : null,
    landarea: req.query.checklandarea && req.query.landarea ? parseInt(req.query.landarea) : null,
    certificate: req.query.checkcertificate && req.query.certificate ? { [Op.iLike]: `%${req.query.certificate.toLowerCase()}%` } : null,
    address: req.query.checkaddress && req.query.address ? { [Op.iLike]: `%${req.query.address.toLowerCase()}%` } : null,
    lat: req.query.checklat && req.query.lat ? parseFloat(req.query.lat) : null,
    long: req.query.checklong && req.query.long ? parseFloat(req.query.long) : null,
    numfloor: req.query.checknumfloor && req.query.numfloor ? parseInt(req.query.numfloor) : null,
    bedroom: req.query.checkbedroom && req.query.bedroom ? parseInt(req.query.bedroom) : null,
    bathroom: req.query.checkbathroom && req.query.bathroom ? parseInt(req.query.bathroom) : null,
    carport: req.query.checkcarport && req.query.carport ? req.query.carport : null,
    garden: req.query.checkgarden && req.query.garden ? req.query.garden : null,
    kitchen: req.query.checkkitchen && req.query.kitchen ? req.query.kitchen : null,
    yard: req.query.checkyard && req.query.yard ? req.query.yard : null,
    livingroom: req.query.checklivingroom && req.query.livingroom ? req.query.livingroom : null,
    diningroom: req.query.checkdiningroom && req.query.diningroom ? req.query.diningroom : null,
    foundation: req.query.checkfoundation && req.query.foundation ? { [Op.iLike]: `%${req.query.foundation.toLowerCase()}%` } : null,
    wall: req.query.checkwall && req.query.wall ? { [Op.contains]: Array.isArray(req.query.wall) ? req.query.wall : [req.query.wall] } : null,
    floortype: req.query.checkfloortype && req.query.floortype ? { [Op.iLike]: `%${req.query.floortype.toLowerCase()}%` } : null,
    floorlength: req.query.checkfloorlength && req.query.floorlength ? parseInt(req.query.floorlength) : null,
    sanitary: req.query.checksanitary && req.query.sanitary ? { [Op.contains]: Array.isArray(req.query.sanitary) ? req.query.sanitary : [req.query.sanitary] } : null,
    jamb: req.query.checkjamb && req.query.jamb ? { [Op.iLike]: `%${req.query.jamb.toLowerCase()}%` } : null,
    ceiling: req.query.checkceiling && req.query.ceiling ? { [Op.iLike]: `%${req.query.ceiling.toLowerCase()}%` } : null,
    roof: req.query.checkroof && req.query.roof ? { [Op.iLike]: `%${req.query.roof.toLowerCase()}%` } : null,
    electricity: req.query.checkelectricity && req.query.electricity ? parseInt(req.query.electricity) : null
  }

  for (q in query) {
    if (query[q] === null) {
      delete query[q];
    }
  }

  models.House.findAll({
    attributes: ['id', 'images', 'name', 'lat', 'long', 'price', 'type', 'landarea', 'certificate', 'carport', 'garden', 'kitchen', 'livingroom', 'yard', 'diningroom'],
    where: query,
    limit: 3,
    offset: req.query.page ? (req.query.page - 1) * 3 : 0,
    order: [[sort.prop, sort.rule]]
  }).then((data) => {
    models.House.count({ where: query })
      .then((total) => {
        res.json({
          data,
          page: parseInt(req.query.page),
          filters: url,
          sort,
          total
        })
      })
  }).catch(err => {
    res.status(500).json(err)
  })
});


router.get('/house/:id', (req, res, next) => {
  models.House.findOne({
    where: {
      id: req.params.id
    },
    include: models.User
  }).then((result) => {
    res.json(result);
  }).catch(err => {
    res.status(500).json(err)
  })
})
module.exports = router;
