module.exports = (req, res, next) => {
  // check if user is ... admin
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    const err = new Error('Unauthorized!!')
    err.status = 401
    next(err)
  }
}
