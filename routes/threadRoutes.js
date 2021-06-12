const express = require("express");
const threadControllers = require("../controllers/threadControllers");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

// @route - /threads/new
// @desc - GET to get the HTML create single thread page
// @access - Private
router.get("/new", threadControllers.getCreateThreadPage);

// @route - /threads/:id
// @desc - GET to get the HTML view single thread page
// @access - Private
router.get("/:id", threadControllers.getThreadPage);

// @route - /threads/:id/edit
// @desc - GET to get the HTML edit single thread page
// @access - Private
router.get("/:id/edit", threadControllers.getEditThreadPage);

module.exports = router;
