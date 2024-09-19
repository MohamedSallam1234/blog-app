const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
  try {
    const { prisma } = req.context
    const { name, email, password } = req.body

    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: 'failure', error: 'Missing required fields' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    if (!user)
      return res
        .status(400)
        .json({ status: 'failure', error: 'User not created' })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })
    res.cookie('accessToken', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      domain: '.localhost' || accessTokenCookieDomain,
    })

    return res.status(201).json({ status: 'success', token, data: user })
  } catch (error) {
    return res.status(500).json({ status: 'failure', error: error.message })
  }
}

module.exports = signup
