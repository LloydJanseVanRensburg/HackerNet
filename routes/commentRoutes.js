const express = require("express");
const commentControllers = require("../controllers/commentControllers");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

// @route  - /comments/new/:threadId
// @desc   - Fetch HTML page (form) to create new comment on thread with threadId
// @access - Private
router.get(
  "/new/:threadId",
  protect,
  authorize("Admin", "User"),
  commentControllers.getCreateCommentPage
);

// @route  - /comments/new/:threadId
// @desc   - POST create new comment in database
// @access - Private
router.post(
  "/new/:threadId",
  protect,
  authorize("Admin", "User"),
  commentControllers.createComment
);

module.exports = router;
