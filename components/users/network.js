const express = require("express");
const response = require("../../network/response");
const { createUser, getAllUsers, deleteUser, modifyUser  } = require("./controller");

const router = express.Router();

router.post("/", (req, res) => {
  createUser(req.body.name)
    .then((message) => response.success(req, res, message, 200))
    .catch((error) =>
      response.error(req, res, "Error en base de datos", null, error)
    );
});

router.get("/", (req, res) => {
  getAllUsers(req.body.name,req.body.userId)
    .then((users) => response.success(req, res, users, 200))
    .catch((error) =>
      response.error(req, res, "Error al obtener usuarios", null, error)
    );
});

router.delete("/", (req, res) => {
  deleteUser(req.body.userId)
    .then((deletedUser) => response.success(req, res, deletedUser, 200))
    .catch((error) =>
      response.error(req,res,"Error borrando elemento en base de datos",null,error
      )
    );
});

router.patch("/", (req, res) => {
  modifyUser(req.body.name, req.body.userId)
    .then((userUpdated) => response.success(req, res, userUpdated, 200))
    .catch((error) =>
      response.error(req, res, "Error en base de datos", null, error)
    );
});
module.exports = router;
