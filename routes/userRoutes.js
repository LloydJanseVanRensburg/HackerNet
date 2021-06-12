const express = require("express");
const userControllers = require("../controllers/userControllers");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

// @route - /users/
// @desc - GET get all of the users from the database
// @access - Private &  Admin Only
router.get("/", isAuth, userControllers.getAllUsers);

// @route - /users/myprofile
// @desc - GET to get the HTML myprofile page
// @access - Private
router.get("/myprofile", userControllers.getMyProfilePage);

module.exports = router;
