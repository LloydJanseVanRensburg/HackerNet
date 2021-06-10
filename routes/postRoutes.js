const express = require("express");
const postControllers = require("../controllers/postControllers");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

router
  .route("/")
  .get(postControllers.getAllPosts)
  .post(isAuth, postControllers.createPost);

router.route("/:id").get(postControllers.getPostById);

module.exports = router;
