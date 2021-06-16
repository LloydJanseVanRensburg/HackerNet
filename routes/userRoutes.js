const express = require("express");
const userControllers = require("../controllers/userControllers");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

// @route - /users/myprofile
// @desc - GET to get the HTML myprofile page
// @access - Private
router.get(
  "/myprofile",
  protect,
  authorize("User", "Admin"),
  userControllers.profilePage
);

module.exports = router;
