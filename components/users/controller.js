const Storage = require("./storage");

function createUser(name) {
  return new Promise((resolve, reject) => {
    if (!name) {
      return reject("No hay nombre de usuario");
    }

    return resolve(
      Storage.addUser(name).catch((error) => reject(error))
    );
  });
}

function getAllUsers(name, userId) {
  return new Promise((resolve, reject) => {
    if (!name && !userId) {
      return reject("No se ingreso ningun nombre de usuario ni identificador de usuario");
    }

    name
      ? resolve(Storage.getAllUsers(name).catch((error) => reject(error)))
      : resolve(
          Storage.getUserById(userId).catch((error) => reject(error))
        );
  });
}

function deleteUser(userId) {
  return new Promise((resolve, reject) => {
    if (!userId) {
      return reject("No hay identificador de usuario");
    }

    return resolve(
      Storage.deleteUser(userId).catch((error) => reject(error))
    );
  });
}

function modifyUser(name, userId) {
  return new Promise((resolve, reject) => {
    if (!userId || !name) {
      return reject("No hay identificador de usuario o nombre de usuario");
    }

    return resolve(
      Storage.modifyUser(name, userId).catch((error) => reject(error))
    );
  });
}
module.exports = { createUser, getAllUsers, deleteUser, modifyUser };
