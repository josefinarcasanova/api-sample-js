const path = require("path");
require("dotenv").config({path: path.resolve(__dirname,".env")}); //Get global variables from .env file

const Server = require("./models/server");

// Initialize server
const server = new Server();
server.listen();