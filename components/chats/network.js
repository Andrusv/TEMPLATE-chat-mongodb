const express = require("express");
const response = require("../../network/response");
const { createChat,
  getAllChats,
  deleteChat } = require("./controller");

const router = express.Router();

router.post("/", (req, res) => {
  createChat(req.body.users)
    .then((message) => response.success(req, res, message, 200))
    .catch((error) =>
      response.error(req, res, "Error en base de datos", null, error)
    );
});

router.get("/", (req, res) => {
  getAllChats(req.body.user)
    .then((chats) => response.success(req, res, chats, 200))
    .catch((error) =>
      response.error(req, res, "Error al obtener chats", null, error)
    );
});

router.delete("/", (req, res) => {
  deleteChat(req.body.chatId)
    .then((deletedChat) => response.success(req, res, deletedChat, 200))
    .catch((error) =>
      response.error(req,res,"Error borrando elemento en base de datos",null,error
      )
    );
});

module.exports = router;
