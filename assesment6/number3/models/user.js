const { ObjectId } = require("mongodb");

const User = {
  _id: ObjectId,
  role: String,
  preferences: [String],
  coursesEnrolled: [ObjectId],
};

module.exports = User;
