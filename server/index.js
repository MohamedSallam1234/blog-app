const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const prismaContextMiddleware = require('./middlewares/prisma-context.js')
const userRouter = require('./routes/user.js')

dotenv.config()

const app = express()

const port = process.env.PORT

app.use(prismaContextMiddleware)
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/v1/users', prismaContextMiddleware, userRouter)

// app.use((req, res, next) => {
//   req.context = {
//     prisma: new PrismaClient(),
//   };
//   next();
// });

app.get('/', (req, res) => {
  res.status(200).json({ message: 'success', data: 'Hello World!' })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}: http://localhost:${port}`)
})
