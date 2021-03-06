module.exports = function (dirname) {
  var express = require('express');
  const helpers = require('../../helpers/util');
  var router = express.Router();
  const models = require('../../models/index')
  const { Op } = require('sequelize')
  var fs = require('fs');
  var path = require('path');

  router.get('/', helpers.isLoggedIn, function (req, res, next) {
    let url = req.originalUrl.split('/admin/houses').pop().split('?').pop();
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
      electricity: req.query.checkelectricity && req.query.electricity ? parseInt(req.query.electricity) : null,
      UserId: req.session.user.id
    }

    for (q in query) {
      if (query[q] === null) {
        delete query[q];
      }
    }

    models.House.findAll({
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

  router.get('/add', helpers.isLoggedIn, (req, res, next) => {
    res.render('admin/add');
  })

  router.get('/edit', helpers.isLoggedIn, (req, res, next) => {
    res.render('admin/edit');
  })

  router.post('/add', helpers.isLoggedIn, (req, res, next) => {
    let data = req.body;
    let files = [];
    let promiseArray = [];
    if (req.files !== null) {
      if (Array.isArray(req.files.images)) {
        req.files.images.forEach((f) => {
          let filename = `${Date.now()}${f.name}`
          let fileuri = path.join(dirname, 'public/files', filename)
          if (f.mimetype.includes('image')) {
            files.push({ name: f.name, type: f.mimetype, path: `/files/${filename}` })
            promiseArray.push(f.mv(fileuri))
          }
        })
      } else {
        let f = req.files.images
        let filename = `${Date.now()}${f.name}`
        let fileuri = path.join(dirname, 'public/files', filename)
        if (f.mimetype.includes('image')) {
          files.push({ name: f.name, type: f.mimetype, path: `/files/${filename}` })
          promiseArray.push(f.mv(fileuri))
        }
      }
    }
    Promise.all(promiseArray).then(() => {
      data.images = files.length > 0 ? files : null
      if (data.wall && !Array.isArray(data.wall)) {
        data.wall = [data.wall]
      }
      if (data.sanitary && !Array.isArray(data.sanitary)) {
        data.sanitary = [data.sanitary]
      }
      if (!data.floorlength) {
        data.floorlength = null
      }
      if (!data.electricity) {
        data.electricity = null
      }
      models.House.create(data).then(() => {
        res.json({ message: 'Success' })
      }).catch(err => {
        res.status(500).json(err)
      })
    }).catch(err => {
      res.status(500).json(err)
    })
  })

  router.delete('/delete/:id', helpers.isLoggedIn, (req, res) => {
    models.House.findOne({
      attributes: ['images'],
      where: {
        id: req.params.id
      }
    }).then((result) => {
      models.House.destroy({
        where: {
          id: req.params.id
        }
      }).then(() => {
        if (result.images !== null) {
          result.images.forEach((f) => {
            try {
              fs.unlinkSync(`${dirname}/public${f.path}`);
            } catch (error) {
              console.error('file not found');
            }
          })
        }
        res.json({ message: 'Success' })
      }).catch(err => {
        res.status(500).json(err)
      })
    }).catch(err => {
      res.status(500).json(err)
    })
  })

  router.get('/edit/:id', helpers.isLoggedIn, (req, res, next) => {
    models.House.findOne({
      where: {
        id: req.params.id
      }
    }).then((result) => {
      res.json(result);
    }).catch(err => {
      res.status(500).json(err)
    })
  })

  router.put('/edit/:id', helpers.isLoggedIn, (req, res, next) => {
    let data = req.body;
    let files = [];
    if (data.previousFile) {
      if (Array.isArray(data.previousFile)) {
        data.previousFile.forEach((f) => {
          f = JSON.parse(f)
          files.push(f);
        })
      } else {
        data.previousFile = JSON.parse(data.previousFile)
        files.push(data.previousFile)
      }
    }
    if (data.deletedFile) {
      if (Array.isArray(data.deletedFile)) {
        data.deletedFile.forEach((f) => {
          f = JSON.parse(f)
          try {
            fs.unlinkSync(`${dirname}/public${f.path}`);
          } catch (error) {
            console.error('file not found');
          }
        })
      } else {
        data.deletedFile = JSON.parse(data.deletedFile)
        try {
          fs.unlinkSync(`${dirname}/public${data.deletedFile.path}`);
        } catch (error) {
          console.error('file not found');
        }
      }
    }
    let promiseArray = [];
    if (req.files !== null) {
      if (Array.isArray(req.files.images)) {
        req.files.images.forEach((f) => {
          let filename = `${Date.now()}${f.name}`
          let fileuri = path.join(dirname, 'public/files', filename)
          files.push({ name: f.name, type: f.mimetype, path: `/files/${filename}` })
          promiseArray.push(f.mv(fileuri))
        })
      } else {
        let f = req.files.images
        let filename = `${Date.now()}${f.name}`
        let fileuri = path.join(dirname, 'public/files', filename)
        files.push({ name: f.name, type: f.mimetype, path: `/files/${filename}` })
        promiseArray.push(f.mv(fileuri))
      }
    }
    Promise.all(promiseArray).then(() => {
      if (!Array.isArray(data.wall)) {
        data.wall = [data.wall]
      }
      if (!Array.isArray(data.sanitary)) {
        data.sanitary = [data.sanitary]
      }
      if (!data.floorlength) {
        data.floorlength = null
      }
      if (!data.electricity) {
        data.electricity = null
      }
      models.House.update({
        name: data.name,
        type: data.type,
        price: data.price,
        landarea: data.landarea,
        certificate: data.certificate,
        address: data.address,
        lat: data.lat,
        long: data.long,
        numfloor: data.numfloor,
        bedroom: data.bedroom,
        bathroom: data.bathroom,
        carport: data.carport,
        garden: data.garden,
        kitchen: data.kitchen,
        yard: data.yard,
        livingroom: data.livingroom,
        diningroom: data.diningroom,
        foundation: data.foundation,
        wall: data.wall,
        floortype: data.floortype,
        floorlength: data.floorlength,
        sanitary: data.sanitary,
        jamb: data.jamb,
        ceiling: data.ceiling,
        roof: data.roof,
        electricity: data.electricity,
        images: files.length > 0 ? files : null
      },
        {
          where: {
            id: req.params.id
          }
        }).then(() => {
          res.json({ message: "Success" })
        }).catch(err => {
          res.status(500).json(err)
        })
    }).catch(err => {
      res.status(500).json(err)
    })
  })

  return router;
}
