const express = require("express");
const { getUsersByRole } = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsersByRole);

module.exports = router;
