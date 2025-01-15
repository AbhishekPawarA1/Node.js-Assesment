const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");


router.get("/user-report", analyticsController.getUserReport);

router.get("/course-popularity", analyticsController.getCoursePopularity);

router.get("/course-duration", analyticsController.getCourseDuration);

module.exports = router;
