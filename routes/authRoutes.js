const express = require("express");
const authControllers = require("../controllers/authControllers");
const router = express.Router();

// @route - /auth/login
// @desc - GET to get the HTML login page
// @access - Public
router.get("/login", authControllers.getLoginPage);

// @route - /auth/register
// @desc - GET to get the HTML register page
// @access - Public
router.get("/register", authControllers.getRegisterPage);

// @route - /auth/logout
// @desc - End user session and redirect to login page
// @access - Public
router.get("/logout", authControllers.logoutUser);

// @route - /auth/login
// @desc - POST authenticate user with login form submission
// @access - Public
router.post("/login", authControllers.loginUser);

// @route - /auth/register
// @desc - POST create new user in the database
// @access - Public
router.post("/register", authControllers.registerUser);

module.exports = router;
