//Gives application access to env variables
require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");
