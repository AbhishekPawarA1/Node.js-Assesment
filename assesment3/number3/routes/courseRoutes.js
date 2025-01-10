const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.get("/courses", courseController.getCourses);
router.get("/courses/summary", courseController.getCourseSummary);
router.put("/courses/:id", courseController.updateCourse);

module.exports = router;
