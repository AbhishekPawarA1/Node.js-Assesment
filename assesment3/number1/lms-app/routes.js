const express = require("express");
const { getCourses, getCourseById, rootRoute } = require("./controllers");

const router = express.Router();

router.get("/", rootRoute);

router.get("/courses", getCourses);


router.get("/courses/:id", getCourseById);

module.exports = router;
