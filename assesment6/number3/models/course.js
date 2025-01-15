const { ObjectId } = require("mongodb");

const Course = {
  _id: ObjectId,
  name: String,
  category: String,
  enrollmentCount: Number,
  createdAt: Date,
};

module.exports = Course;
