const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/")
.post(userController.addOne);

router.route("/login")
.post(userController.login);

module.exports = router;