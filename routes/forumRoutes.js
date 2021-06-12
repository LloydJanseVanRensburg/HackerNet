const express = require("express");
const forumControllers = require("../controllers/forumControllers");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

// @route - /forums/:id
// @desc - GET to get the HTML view forums page
// @access - Private
router.get("/", forumControllers.getForumsPage);

// @route - /forums/new
// @desc - GET to get the HTML create new forums page
// @access - Private
router.get("/new", forumControllers.getCreateForumPage);

// @route - /forums/:id
// @desc - GET to get the HTML create new forums page
// @access - Private
router.get("/:id", forumControllers.getForumPage);

// @route - /forums/:id/edit
// @desc - GET to get the HTML create new forums page
// @access - Private
router.get("/:id/edit", forumControllers.getEditForumPage);

module.exports = router;
