const express = require("express");
const feedControllers = require("../controllers/feedControllers");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

// @route - /feed/
// @desc - GET to get the HTML feed page
// @access - Private
router.get("/", protect, authorize("User", "Admin"), feedControllers.feedPage);

module.exports = router;
