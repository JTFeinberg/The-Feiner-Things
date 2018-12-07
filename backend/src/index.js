const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
//Gives application access to env variables
require("dotenv").config({ path: "variables.env" })

const createServer = require("./createServer")
const db = require("./db");

const server = createServer();

// Middleware to handle cookies (JWT)
// Access cookies in formatted object rather than cookie string as header
server.express.use(cookieParser())

// Decode the JWT to get the user ID on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    //put the user id on the req for future middleware to access
    req.userId = userId
  }
  next()
})


server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  details => {
    console.log(`The server is running on port http:localhost:${details.port}`)
  }
)
