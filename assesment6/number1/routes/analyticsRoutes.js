const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");


router.get("/user-count", analyticsController.getUserCount);
router.get("/course-count", analyticsController.getCourseCount);

module.exports = router;
