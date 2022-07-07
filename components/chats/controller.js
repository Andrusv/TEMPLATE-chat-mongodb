const Storage = require("./storage");

function createChat(users) {
  return new Promise((resolve, reject) => {
    if (!users) {
      return reject("No hay usuario");
    }

    return resolve(
      Storage.createChat(users).catch((error) => reject(error))
    );
  });
}

function getAllChats(user) {
  return new Promise((resolve, reject) => {
    !user
      ? resolve(Storage.getAllChats().catch((error) => reject(error)))
      : resolve(
          Storage.getChatsByUser(user).catch((error) => reject(error))
        );
  });
}

function deleteChat(chatId) {
  return new Promise((resolve, reject) => {
    if (!chatId) {
      return reject("No hay identificador de chat");
    }

    return resolve(
      Storage.deleteChat(chatId).catch((error) => reject(error))
    );
  });
}
module.exports = { createChat, getAllChats, deleteChat};
