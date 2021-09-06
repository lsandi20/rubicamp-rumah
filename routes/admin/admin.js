module.exports = function (dirname) {
  var express = require('express');
  const helpers = require('../../helpers/util');
  var router = express.Router();
  const models = require('../../models/index')
  var houseRouter = require('./houses')(dirname);
  var loginRouter = require('./login');

  /* GET users listing. */
  router.get('/', helpers.isLoggedIn, function (req, res, next) {
    res.render('admin/index')
  })

  router.use('/houses', houseRouter);
  router.use('/login', loginRouter);

  return router;
}
