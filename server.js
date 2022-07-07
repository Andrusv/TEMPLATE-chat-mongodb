const express = require("express");
const app = express();
const router = require("./network/routes");
const server = require("http").Server(app);

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const socket = require("./socket");

const { config } = require("./config/index");
const db = require("./db");

const host = config.host;
const dbAdmin = config.dbAdmin;
const dbPassword = config.dbPassword;
const dbHost = config.dbHost;

const uri = `mongodb://${dbAdmin}:${dbPassword}@${dbHost}`;

db.connectMongoDb(uri);

//Para compartir archivos atraves de un endpoint en la carpeta Public.
app.use("/static-files", express.static("public"));

socket.connect(server);
router(app);

// app.listen(config.port);
server.listen(config.port, () => {
  console.log(`${host}:${config.port}`);
});
