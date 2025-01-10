const express = require("express");
const { getCourses, getCourseById, rootRoute } = require("./controllers");

const router = express.Router();

// Root route (optional)
router.get("/", rootRoute);

// Route to retrieve all courses or filter by availability
router.get("/courses", getCourses);

// Route to retrieve a single course by ID
router.get("/courses/:id", getCourseById);

module.exports = router;
