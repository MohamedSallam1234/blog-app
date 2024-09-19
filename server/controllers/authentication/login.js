const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  try {
    const accessTokenCookieDomain = process.env.ACCESS_TOKEN_COOKIE ?? ''
    const { prisma } = req.context
    const { email, password } = req.body

    if (!email || !password)
      return res
        .status(400)
        .json({ message: 'failure', error: 'Missing required fields' })

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user)
      return res
        .status(400)
        .json({ status: 'failure', error: 'User not found' })

    if ((await bcrypt.compare(password, user.password)) === false)
      return res
        .status(400)
        .json({ status: 'failure', error: 'Invalid password' })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })
    res.cookie('accessToken', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      domain: '.localhost' || accessTokenCookieDomain,
    })

    delete user.password

    return res.status(200).json({ status: 'success', token, data: user })
  } catch (error) {
    return res.status(500).json({ status: 'failure', error: error.message })
  }
}

module.exports = login
