const express = require("express");
const { createUser, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.post("/user", createUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
