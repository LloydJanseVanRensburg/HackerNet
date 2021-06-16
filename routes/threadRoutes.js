const express = require("express");
const threadControllers = require("../controllers/threadControllers");
const { protect, authorize } = require("../middleware/auth");
const uploader = require("../middleware/fileUploader");
const router = express.Router();

// @route - /threads/
// @desc - POST create a new thread
// @access - Private
router.post(
  "/",
  protect,
  authorize("User", "Admin"),
  uploader.single("image"),
  threadControllers.createNewThread
);

// @route - /threads/new
// @desc - GET to get the HTML create single thread page
// @access - Private
router.get(
  "/new",
  protect,
  authorize("User", "Admin"),
  threadControllers.createNewThreadPage
);

// @route - /threads/:id
// @desc - GET to get the HTML view single thread page
// @access - Private
router.get(
  "/:id",
  protect,
  authorize("User", "Admin"),
  threadControllers.threadPage
);

// @route - /threads/:id
// @desc - PUT to update a thread by id
// @access - Private
router.put(
  "/:id",
  protect,
  authorize("User", "Admin"),
  uploader.single("image"),
  threadControllers.editThread
);

// @route - /threads/:id
// @desc - DELETE to delete thread by id
// @access - Private
router.delete(
  "/:id",
  protect,
  authorize("User", "Admin"),
  threadControllers.deleteThread
);

// @route - /threads/:id/edit
// @desc - GET to get the HTML edit single thread page
// @access - Private
router.get(
  "/:id/edit",
  protect,
  authorize("User", "Admin"),
  threadControllers.editThreadPage
);

module.exports = router;
