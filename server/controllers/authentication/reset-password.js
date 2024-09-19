const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const resetPassword = async (req, res, next) => {
  try {
    const { prisma } = req.context
    const { password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await prisma.user.findUnique({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: { gt: new Date() }
      }
    })

    if (!user) {
      return res.status(400).json({
        status: 'failure',
        error: 'Token is invalid or has expired'
      })
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null
      }
    })

    if (!updatedUser) {
      return res.status(500).json({
        status: 'failure',
        error: 'Failed to update password'
      })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })
    res.cookie('accessToken', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      domain: '.localhost' || accessTokenCookieDomain,
    })

    res.status(200).json({
      status: 'success',
      message: 'Password updated successfully',
      token
    })

  } catch (error) {
    next(error)
  }
}

module.exports = resetPassword