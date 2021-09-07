module.exports = function (dirname) {
  var express = require('express');
  const helpers = require('../../helpers/util');
  var router = express.Router();
  const models = require('../../models/index')
  var houseRouter = require('./houses')(dirname);
  var loginRouter = require('./login');
  const bcrypt = require('bcrypt');

  /* GET users listing. */
  router.get('/', helpers.isLoggedIn, function (req, res, next) {
    res.render('admin/index')
  })

  router.get('/profile', helpers.isLoggedIn, function (req, res, next) {
    res.render('admin/profile')
  })

  router.get('/profileinfo', helpers.isLoggedIn, function (req, res, next) {
    models.User.findOne({
      attributes: ['email', 'firstName', 'lastName', 'phone'],
      where: {
        id: req.session.user.id
      }
    }).then((result) => {
      res.json(result.dataValues)
    }).catch(err => {
      res.status(500).json(err)
    })
  })

  router.put('/profile', helpers.isLoggedIn, function (req, res, next) {
    let { password, firstName, lastName, phone } = req.body
    if (password.length === 0) {
      models.User.update({ firstName, lastName, phone }, {
        where: {
          id: req.session.user.id
        }
      }).then((result) => {
        return res.json({ message: 'Success' })
      })
        .catch(err => {
          res.status(500).json(err)
        })
    } else {
      let hashedpassword = bcrypt.hashSync(password, 10)
      models.User.update({ password: hashedpassword, firstName, lastName, phone }, {
        where: {
          id: req.session.user.id
        }
      }).then((result) => {
        return res.json({ message: 'Success' })
      })
        .catch(err => {
          res.status(500).json(err)
        })
    }
  })


  router.use('/houses', houseRouter);
  router.use('/login', loginRouter);

  return router;
}
