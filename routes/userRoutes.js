const express = require("express");
const userControllers = require("../controllers/userControllers");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

// @route - /users/
// @desc - GET get all of the users from the database
// @access - Private &  Admin Only
router.get(
  "/",
  protect,
  authorize("User", "Admin"),
  userControllers.getAllUsers
);

// @route - /users/myprofile
// @desc - GET to get the HTML myprofile page
// @access - Private
router.get(
  "/myprofile",
  protect,
  authorize("User", "Admin"),
  userControllers.getMyProfilePage
);

module.exports = router;
