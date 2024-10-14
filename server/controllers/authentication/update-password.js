const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const updatePassword = async (req, res, next) => {
  try {
    const { email } = req.body
    const { prisma } = req.context
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) {
      return res.status(404).json({
        status: 'failure',
        error: 'User not found',
      })
    }

    const { currentPassword, newPassword, newPasswordConfirm } = req.body

    if (!currentPassword || !newPassword || !newPasswordConfirm) {
      return res.status(400).json({
        status: 'failure',
        error: 'Missing required fields',
      })
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    )

    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: 'failure',
        error: 'Current password is incorrect',
      })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: hashedPassword,
      },
    })

    if (!updatedUser) {
      return res.status(500).json({
        status: 'failure',
        error: 'Failed to update password',
      })
    }

    const token = jwt.sign({ id: req.userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })

    res.cookie('accessToken', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      domain: '.localhost' || accessTokenCookieDomain,
    })

    return res.status(200).json({
      status: 'success',
      message: 'Password updated successfully',
      token,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updatePassword
