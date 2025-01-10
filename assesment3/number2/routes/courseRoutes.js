const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");


router.get("/courses", courseController.getCourses);
router.put("/courses/:id", courseController.updateCourse);
router.get("/courses/summary", courseController.getCoursesSummary);

module.exports = router;
