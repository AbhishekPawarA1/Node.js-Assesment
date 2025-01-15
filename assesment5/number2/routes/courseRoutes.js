const express = require("express");
const { getCourses, enrollUser } = require("../controllers/courseController");

const router = express.Router();

router.get("/", getCourses);
router.post("/enroll", enrollUser);

module.exports = router;
