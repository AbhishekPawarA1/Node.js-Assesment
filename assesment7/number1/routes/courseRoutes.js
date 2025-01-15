const express = require("express");
const {
  createCourse,
  filterCourses,
} = require("../controllers/courseController");
const router = express.Router();

router.post("/", createCourse);
router.get("/filter", filterCourses);

module.exports = router;
