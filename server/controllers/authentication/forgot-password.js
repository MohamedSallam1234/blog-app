const crypto = require('crypto')
const sendEmail = require('../../utils/email.js')

const forgotPassword = async (req, res, next) => {
  try {
    const { prisma } = req.context
    const { email } = req.body

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return res.status(404).json({
        status: 'Failure',
        message: 'User not found',
      })
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    const passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex')
    const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000)

    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        passwordResetToken,
        passwordResetExpires,
      },
    })

    if (!updatedUser) {
      return res.status(500).json({
        status: 'failure',
        error: 'Failed to save password reset token',
      })
    }

    const resetURL = `http://localhost:5000/api/v1/users/reset-password/${resetToken}`

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to : ${resetURL}.\nIf you didn't forget your password, Please ignore this email!`

    try {
      const passwordResetEmail = await sendEmail({
        email,
        subject: 'Password reset token (valid for 10 min)',
        message,
      })
    } catch (error) {
      return res.status(500).json({
        status: 'failure',
        error: error.message,
      })
    }

    if (!passwordResetEmail) {
      return res.status(500).json({
        status: 'failure',
        error: 'Failed to send password reset token via email',
      })
    }

    res.status(200).json({
      status: 'success',
      message: 'Password reset token saved and sent to email',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = forgotPassword
