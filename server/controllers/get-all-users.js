const getAllUsers = async (req, res) => {
  try {
    const { prisma } = req.context
    const users = await prisma.user.findMany()

    if (!users)
      return res
        .status(400)
        .json({ status: 'failure', error: 'No users found' })

    return res.status(200).json({ status: 'success', data: users })
  } catch (error) {
    return res.status(500).json({ status: 'failure', error: error.message })
  }
}

module.exports = getAllUsers
