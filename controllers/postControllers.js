const Post = require("../models/Post");

exports.getAllPosts = async (req, res, next) => {
  try {
    const [posts, _] = await Post.findAll();

    const result = {
      count: posts.length,
      posts,
    };

    res.status(200).send(result);
  } catch (error) {
    console.trace(error);
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    let postId = req.params.id;

    const [post, _] = await Post.findById(postId);

    res.status(200).json({ post });
  } catch (error) {
    console.trace(error);
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  let { title, body } = req.body;
  let userId = req.session.userId;

  try {
    let post = new Post(title, body, userId);

    post = await post.save();

    res.status(201).send({ post });
  } catch (error) {
    console.trace(error);
    next(error);
  }
};
