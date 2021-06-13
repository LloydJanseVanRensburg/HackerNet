const express = require("express");
const forumControllers = require("../controllers/forumControllers");
const { protect, authorize } = require("../middleware/auth");
const uploader = require("../middleware/fileUploader");
const router = express.Router();

// @route - /forums/
// @desc - GET to get the HTML view forums page
// @access - Private
router.get(
  "/",
  protect,
  authorize("User", "Admin"),
  forumControllers.getForumsPage
);

// @route - /forums/
// @desc - POST to create new forum
// @access - Private
router.post(
  "/",
  protect,
  authorize("Admin"),
  uploader.single("image"),
  forumControllers.createNewForum
);

// @route - /forums/new
// @desc - GET to get the HTML create new forums page
// @access - Private | Admin Only
router.get(
  "/new",
  protect,
  authorize("Admin"),
  forumControllers.getCreateForumPage
);

// @route - /forums/:id
// @desc - GET to get the HTML single forum page
// @access - Private
router.get(
  "/:id",
  protect,
  authorize("User", "Admin"),
  forumControllers.getForumPage
);

// @route - /forums/:id/edit
// @desc - GET to get the HTML edit forum page
// @access - Private
router.get(
  "/:id/edit",
  protect,
  authorize("Admin"),
  forumControllers.getEditForumPage
);

module.exports = router;
