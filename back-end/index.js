const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const prismaContextMiddleware = require('./middlewares/prismaContext.js')

dotenv.config()

const app = express()

const port = process.env.PORT

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use((req, res, next) => {
//   req.context = {
//     prisma: new PrismaClient(),
//   };
//   next();
// });

app.use(prismaContextMiddleware)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'success', data: 'Hello World!' })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}: http://localhost:${port}`)
})
