const express = require("express");
const {
  getUserLanguagePreferences,
  getCourseEnrollmentStats,
  getCourseDurationCategories,
} = require("../controllers/analyticsController");

const router = express.Router();

router.get("/user-language-preferences", getUserLanguagePreferences);
router.get("/course-enrollment-stats", getCourseEnrollmentStats);
router.get("/course-duration-categories", getCourseDurationCategories);

module.exports = router;
