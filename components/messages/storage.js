const { MessageModel } = require("./model");

function addMessage(message) {
  return new MessageModel(message).save();
}

function getAllMessages(user) {
  return MessageModel.find({ user }).populate('user')
}

function getMessageById(messageId) {
  return MessageModel.find({ _id: messageId });
}

function deleteMessage(messageId) {
  return MessageModel.find({ _id: messageId }).deleteOne({
    _id: messageId,
  });
}

function modifyMessage(message, messageId) {
  return MessageModel.find({ _id: messageId }).updateOne({ message });
}

module.exports = {
  addMessage,
  getAllMessages,
  getMessageById,
  deleteMessage,
  modifyMessage,
};
