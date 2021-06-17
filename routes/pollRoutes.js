const express = require("express");
const pollControllers = require("../controllers/pollControllers");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

// @route - /polls/
// @desc - POST to create a new poll in database
// @access - Private
router.post(
  "/",
  protect,
  authorize("Admin", "User"),
  pollControllers.createNewPoll
);

// @route - /polls/new
// @desc - Get HTML page to create a new poll
// @access - Private
router.get(
  "/new",
  protect,
  authorize("Admin", "User"),
  pollControllers.createNewPollPage
);

// @route - /polls/:pollId/vote/:questionId
// @desc - Get HTML page to view poll
// @access - Private
router.post(
  "/vote/:questionId",
  protect,
  authorize("Admin", "User"),
  pollControllers.createPollVote
);

// @route - /polls/:id
// @desc - Get HTML page to view poll
// @access - Private
router.get(
  "/:id",
  protect,
  authorize("Admin", "User"),
  pollControllers.pollPage
);

module.exports = router;
