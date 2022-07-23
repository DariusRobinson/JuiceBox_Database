require('dotenv').config();

const { PORT = 3000 } = process.env
const express = require("express");
const morgan = require("morgan");
const server = express();
const { client } = require("./db");
const apiRouter = require("./api");
client.connect();

//SERVER.USE
server.use(morgan("dev"));

server.use(express.json());


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