const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  users: [{
    type: Schema.ObjectId,
    ref: 'Users',
    required: true
  }],
  messages: [{
    type: String,
    required: false,
  }],
  date: Date,
});

// 1st table, 2nd schema
const ChatModel = mongoose.model("Chats", chatSchema);

module.exports = { ChatModel };
