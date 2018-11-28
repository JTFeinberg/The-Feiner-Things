//Gives application access to env variables
require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// TO DO Use express middleware to handle cookies
// TO DO Use express middleware to populate current user
