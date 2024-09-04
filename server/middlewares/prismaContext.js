const prisma = require('../prismaSingleton.js');

const prismaContextMiddleware = (req, res, next) => {
  req.context = {
    prisma,
    userId: req.userId || null, // Assuming you set req.userId somewhere earlier
  };
  next();
};

module.exports = prismaContextMiddleware;