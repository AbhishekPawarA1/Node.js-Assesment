const express = require("express");
const {
  createCourse,
  addStudentToCourse,
  removeStudentFromCourse,
  deleteCourse,
} = require("../controllers/courseController");

const router = express.Router();

router.post("/course", createCourse);
router.post("/enroll", addStudentToCourse);
router.post("/unenroll", removeStudentFromCourse);
router.delete("/course/:id", deleteCourse);

module.exports = router;
