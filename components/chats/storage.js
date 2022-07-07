const { ChatModel } = require("./model");

function createChat(users) {
  return new ChatModel({users}).save();
}

function getAllChats() {
  return ChatModel.find().populate('users');
}

function getChatsByUser(name) {
  return ChatModel.find({ users : [name] }).populate('users');
}

function deleteChat(chatId) {
  return ChatModel.find({ _id: chatId }).deleteOne({
    _id: chatId,
  });
}

module.exports = {
  createChat,
  getAllChats,
  getChatsByUser,
  deleteChat,
};
