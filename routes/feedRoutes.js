const express = require("express");
const feedControllers = require("../controllers/feedControllers");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

// @route - /feed/
// @desc - GET to get the HTML feed page
// @access - Private
router.get("/", feedControllers.getFeedPage);

module.exports = router;
