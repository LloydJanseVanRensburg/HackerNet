const Comment = require("../models/Comment");
const catchAsync = require("../middleware/catchAsync");

exports.createNewCommentPage = (req, res, next) => {
  let threadId = req.params.threadId;

  let pageData = {
    pageTitle: "Create Comment",
    threadId,
    isAuth: req.session.isLoggedIn,
  };

  res.render("create-comment", pageData);
};

exports.createNewComment = catchAsync(async (req, res, next) => {
  let { title, body } = req.body;
  let thread_id = req.params.threadId;
  let user_id = req.user.user_id;

  const newComment = new Comment(title, body, user_id, thread_id);

  await newComment.save();

  res.status(201).redirect(`/threads/${thread_id}`);
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  let user_id = req.user.user_id;
  let comment_id = req.params.commentId;

  let [comment, _a] = await Comment.findById(comment_id);

  if (comment.length === 0) {
    return res.status(404).redirect("/feed");
  }

  if (user_id !== comment[0].user_id) {
    return res.status(403).redirect("/feed");
  }

  await Comment.findByIdAndDelete(comment_id);

  res.status(204).redirect("/feed");
});
