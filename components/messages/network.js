const express = require("express");
const response = require("../../network/response");
const multer = require('multer')
const { sendMessage, getAllMessages, deleteMessage,modifyMessage } = require("./controller");


//MULTER CONFIG FOR REAL FILE NAME
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })
// var upload = multer({ storage: storage })
const upload = multer({
  dest: 'public/files/'
})

const router = express.Router();

router.post("/", upload.single('file') ,(req, res) => {
  sendMessage(req.body.message, req.body.user, req.file)
    .then((message) => response.success(req, res, message, 200))
    .catch((error) =>
      response.error(req, res, "Error en base de datos", null, error)
    );
});

router.get("/", (req, res) => {
  getAllMessages(req.body.user,req.body.messageId)
    .then((messages) => response.success(req, res, messages, 200))
    .catch((error) =>
      response.error(req, res, "Error al obtener mensajes", null, error)
    );
});

router.delete("/", (req, res) => {
  deleteMessage(req.body.messageId)
    .then((deletedMessage) => response.success(req, res, deletedMessage, 200))
    .catch((error) =>
      response.error(req,res,"Error borrando elemento en base de datos",null,error
      )
    );
});

router.patch("/", (req, res) => {
  modifyMessage(req.body.message, req.body.messageId)
    .then((messageUpdated) => response.success(req, res, messageUpdated, 200))
    .catch((error) =>
      response.error(req, res, "Error en base de datos", null, error)
    );
});
module.exports = router;
