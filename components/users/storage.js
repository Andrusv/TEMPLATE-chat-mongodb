const { UserModel } = require("./model");

function addUser(name) {
  return new UserModel({name}).save();
}

function getAllUsers() {
  return UserModel.find();
}

function getUserById(userId) {
  return UserModel.find({ _id: userId });
}

function deleteUser(userId) {
  return UserModel.find({ _id: userId }).deleteOne({
    _id: userId,
  });
}

function modifyUser(name, userId) {
  return UserModel.find({ _id: userId }).updateOne({ name });
}

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  deleteUser,
  modifyUser,
};
