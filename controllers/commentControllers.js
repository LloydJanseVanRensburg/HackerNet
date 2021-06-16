const Comment = require("../models/Comment");

exports.getCreateCommentPage = (req, res, next) => {
  let threadId = req.params.threadId;

  let pageData = {
    pageTitle: "Create Comment",
    threadId,
    isAuth: req.session.isLoggedIn,
  };

  res.render("create-comment", pageData);
};

exports.createComment = async (req, res, next) => {
  try {
    let { title, body } = req.body;
    let thread_id = req.params.threadId;
    let user_id = req.user.user_id;

    const newComment = new Comment(title, body, user_id, thread_id);

    await newComment.save();

    res.status(201).redirect(`/threads/${thread_id}`);
  } catch (error) {
    next(error);
  }
};
