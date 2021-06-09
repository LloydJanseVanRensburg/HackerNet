const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();

router.route("/").get(userControllers.getAllUsers);

router.route("/login").post(userControllers.loginUser);
router.route("/register").post(userControllers.registerUser);

module.exports = router;
