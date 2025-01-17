const express = require("express");
const router = express.Router();
const {
  userEngagement,
  courseSummary,
} = require("../controllers/analyticsController");

// User Engagement Analytics
router.get("/user-engagement", userEngagement);

// Course Analytics
router.get("/summary", courseSummary);

module.exports = router;
