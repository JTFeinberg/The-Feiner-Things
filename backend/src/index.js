//Gives application access to env variables
require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// TO DO Use express middleware to handle cookies
// TO DO Use express middleware to populate current user

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  details => {
    console.log(`The server is running on port http:localhost:${details.port}`);
  }
);
