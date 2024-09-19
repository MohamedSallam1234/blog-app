const restrictTo = (roles) => {
  return (req, res, next) => {
    console.log(req.user)
    console.log(roles)
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'failure',
        error: 'You do not have permission to perform this action',
      })
    }

    next()
  }
}

module.exports = restrictTo
