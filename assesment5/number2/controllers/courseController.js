const Course = require("../models/course");
const User = require("../models/user");

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort("title");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.enrollUser = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course || !user) {
      return res.status(404).json({ message: "User or Course not found" });
    }

    if (course.enrolledStudents.includes(userId)) {
      return res.status(400).json({ message: "User already enrolled" });
    }

    if (course.enrolledStudents.length >= course.maxCapacity) {
      return res.status(400).json({ message: "Course is at full capacity" });
    }

    course.enrolledStudents.push(userId);
    user.enrolledCourses.push(courseId);

    await course.save();
    await user.save();

    res.status(200).json({ message: "User enrolled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
