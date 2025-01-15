const express = require("express");
const { createUser, filterUsers } = require("../controllers/userController");
const router = express.Router();

router.post("/", createUser);
router.get("/filter", filterUsers);

module.exports = router;
