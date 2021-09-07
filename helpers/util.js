module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.session.user) {
      return next()
    }
    res.redirect('/admin/login')
  }
}