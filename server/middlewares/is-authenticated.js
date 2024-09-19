const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const isAuthenticated = async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    res.status(401).json({
      status: 'Failure',
      message:
        'Unauthorized, You are not logged in! Please log in to get access.',
    })
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  const currentUser = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  })

  if (!currentUser) {
    res.status(401).json({
      status: 'Failure',
      message: 'The user belonging to this token does no longer exist.',
    })
  }

  if (currentUser.passwordChangedAt) {
    if (
      parseInt(currentUser.passwordChangedAt.getTime() / 1000, 10) > decoded.iat
    ) {
      res.status(401).json({
        status: 'Failure',
        message: 'User recently changed password! Please log in again.',
      })
    }
  }

  req.user = currentUser

  console.log(req.user)

  next()
}

module.exports = isAuthenticated
