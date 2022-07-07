const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'Users'
  },
  message: {
    type: String,
    required: true,
  },
  file: String,
  date: Date,
});

// 1st table, 2nd schema
const MessageModel = mongoose.model("Messages", messageSchema);

module.exports = { MessageModel };
