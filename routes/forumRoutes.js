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
  forumControllers.forumsPage
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
  forumControllers.createNewForumPage
);

// @route - /forums/:id
// @desc - GET to get the HTML single forum page
// @access - Private
router.get(
  "/:id",
  protect,
  authorize("User", "Admin"),
  forumControllers.forumPage
);

// @route - /forums/:id
// @desc - PUT route to make update to forum with id
// @access - Private | Admin Only
router.put(
  "/:id",
  protect,
  authorize("Admin"),
  uploader.single("image"),
  forumControllers.editForum
);

// @route - /forums/:id
// @desc - DELETE route to delete forum with id
// @access - Private | Admin Only
router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  forumControllers.deleteForum
);

// @route - /forums/:id/edit
// @desc - GET to get the HTML edit forum page
// @access - Private | Admin Only
router.get(
  "/:id/edit",
  protect,
  authorize("Admin"),
  forumControllers.editForumPage
);

// @route - /forums/:id/follow
// @desc - GET to follow forum by id
// @access - Private
router.get(
  "/:id/follow",
  protect,
  authorize("User", "Admin"),
  forumControllers.addForumFollower
);

// @route - /forums/:id/unfollow
// @desc - GET to unfollow forum by id
// @access - Private
router.get(
  "/:id/unfollow",
  protect,
  authorize("User", "Admin"),
  forumControllers.removeForumFollower
);

module.exports = router;
