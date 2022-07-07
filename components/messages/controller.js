const Storage = require("./storage");
const { config } = require("../../config/index");
const { socket } = require("../../socket");

const host = config.host;
const port = config.port;

function sendMessage(message, user, file) {
  return new Promise((resolve, reject) => {
    if (!message || !user) {
      return reject("No hay usuario o mensaje");
    }

    let fileUrl = "";
    if (file) {
      fileUrl = `${host}:${port}/static-files/files/${file.filename}`;
    }
    const finalMessage = {
      user: user,
      message: message,
      file: fileUrl,
      date: new Date(),
    };

    socket.io.emit("message", finalMessage)
    
    return resolve(
      Storage.addMessage(finalMessage)
        .catch((error) => reject(error))
    );
  });
}

function getAllMessages(user, messageId) {
  return new Promise((resolve, reject) => {
    if (!user && !messageId) {
      return reject("No se ingreso ningun usuario ni identificador de mensaje");
    }

    user
      ? resolve(Storage.getAllMessages(user).catch((error) => reject(error)))
      : resolve(
          Storage.getMessageById(messageId).catch((error) => reject(error))
        );
  });
}

function deleteMessage(messageId) {
  return new Promise((resolve, reject) => {
    if (!messageId) {
      return reject("No hay identificador de mensaje");
    }

    return resolve(
      Storage.deleteMessage(messageId).catch((error) => reject(error))
    );
  });
}

function modifyMessage(message, messageId) {
  return new Promise((resolve, reject) => {
    if (!messageId || !message) {
      return reject("No hay identificador de mensaje o mensaje");
    }

    return resolve(
      Storage.modifyMessage(message, messageId).catch((error) => reject(error))
    );
  });
}
module.exports = { sendMessage, getAllMessages, deleteMessage, modifyMessage };
