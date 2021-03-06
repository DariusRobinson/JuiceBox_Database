require('dotenv').config();

const PORT = 3000;
const express = require("express");
const morgan = require("morgan");
const server = express();
const { client } = require("./db");
const apiRouter = require("./api");

//SERVER.USE
server.use(morgan("dev"));

server.use(express.json());

client.connect();

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});



server.use("/api", apiRouter);