const express = require("express");
const {
  getUserRoleCount,
  getCourseCategoryCount,
} = require("../controllers/analyticsController");

const router = express.Router();

router.get("/user-role-count", getUserRoleCount);
router.get("/course-category-count", getCourseCategoryCount);

module.exports = router;
