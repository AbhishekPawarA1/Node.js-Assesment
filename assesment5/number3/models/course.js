const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

courseSchema.methods.addStudent = async function (studentId) {
  if (this.enrolledStudents.length >= this.capacity) {
    throw new Error("Course is at full capacity");
  }
  if (this.enrolledStudents.includes(studentId)) {
    throw new Error("Student is already enrolled");
  }
  this.enrolledStudents.push(studentId);
  await this.save();
};

courseSchema.methods.removeStudent = async function (studentId) {
  const index = this.enrolledStudents.indexOf(studentId);
  if (index === -1) {
    throw new Error("Student is not enrolled");
  }
  this.enrolledStudents.splice(index, 1);
  await this.save();
};

courseSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const course = this;
    const User = require("./user");
    const usersEnrolled = await User.find({
      _id: { $in: course.enrolledStudents },
    });
    if (usersEnrolled.length > 0) {
      throw new Error("Cannot delete course while users are enrolled");
    }
    next();
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
