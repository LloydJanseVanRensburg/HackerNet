const express = require("express");
const commentControllers = require("../controllers/commentControllers");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

// @route - /comments/
// @desc - GET to get all comments from database
// @access - Private & Admin Only
router.get("/", isAuth, commentControllers.getAllPosts);

// @route - /comments/
// @desc - POST create a new comment in database
// @access - Private
router.post("/", isAuth, commentControllers.createPost);

// @route - /comments/:id
// @desc - GET a comment by primary key id
// @access - Private
router.get("/:id", isAuth, commentControllers.getPostById);

// @route - /comments/:id
// @desc - PUT to update a given comment by id
// @access - Private
router.put("/:id", isAuth, commentControllers.updatePost);

// @route - /comments/:id
// @desc - DELETE to delete a comment by id
// @access - Private
router.delete("/:id", isAuth, commentControllers.delete);

module.exports = router;
