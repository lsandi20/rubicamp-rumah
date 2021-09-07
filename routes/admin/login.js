var express = require('express');
var router = express.Router();
let models = require('../../models/index');
const bcrypt = require('bcrypt');
/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.user) {
    return res.redirect('/admin')
  }
  res.render('login');
});

router.post('/auth', function (req, res, next) {
  console.log(req.body)
  const { email, password } = req.body
  models.User.findOne({ where: { email } }).then(result => {
    if (result === null) {
      return res.status(404).json({ message: 'User not found' })
    }
    console.log(result.dataValues);
    let data = result.dataValues;
    if (bcrypt.compareSync(password, data.password)) {
      req.session.user = data;
      return res.json({ message: 'Success' })
    } else {
      return res.status(404).json({ message: 'Password not match' })
    }
  }).catch(err => {
    res.status(500).json(err)
  })
})

router.get('/userinfo', function (req, res, next) {
  if (req.session.user) {
    return res.json(req.session.user);
  } else {
    return res.status(401).json({ message: 'Unauthorized' })
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy(() => {
    return res.json({ message: 'Success' })
  })
})

module.exports = router;
