const Forum = require("../models/Forum");
const Thread = require("../models/Thread");
const catchAsync = require("../middleware/catchAsync");

exports.threadPage = catchAsync(async (req, res, next) => {
  const [thread, _a] = await Thread.findById(req.params.id);
  const [threadComments, _b] = await Thread.findThreadsComments(req.params.id);

  const userId = req.user.user_id;

  if (thread.length === 0) {
    res.status(404).redirect("/feed");
  }

  let pageData = {
    pageTitle: "Thread Page",
    isAuth: req.session.isLoggedIn,
    threadData: thread[0],
    threadComments,
    userId,
  };

  res.status(200).render("view-thread", pageData);
});

exports.createNewThreadPage = catchAsync(async (req, res, next) => {
  const forumsYouFollow = await Forum.findMyJoinedForums(req.user.user_id);

  let pageData = {
    pageTitle: "Create Thread Page",
    isAuth: true,
    forumsYouFollow,
  };

  res.status(200).render("create-thread", pageData);
});

exports.createNewThread = catchAsync(async (req, res, next) => {
  let { forum, title, body } = req.body;
  let image_url = null;
  if (req.file) {
    image_url = req.file.path;
  }

  let user_id = req.user.user_id;

  const newThread = new Thread(user_id, forum, title, body, image_url);

  const [result, _a] = await newThread.save();

  res.status(201).redirect(`/threads/${result.insertId}`);
});

exports.editThreadPage = catchAsync(async (req, res, next) => {
  let thread_id = req.params.id;
  let [threadData, _a] = await Thread.findById(thread_id);

  let pageData = {
    pageTitle: "Edit Thread",
    isAuth: true,
    threadData: threadData[0],
  };

  res.status(200).render("edit-thread", pageData);
});

exports.editThread = catchAsync(async (req, res, next) => {
  let thread_id = req.params.id;
  let { title, body } = req.body;
  let image_url;
  if (req.file) {
    image_url = req.file.path;
  }

  const [thread, _a] = await Thread.findById(thread_id);

  if (thread.length === 0) {
    return res.status(404).redirect("/feed");
  }

  if (title) thread[0].title = title;
  if (body) thread[0].body = body;
  if (image_url) thread[0].image_url = image_url;

  await Thread.findByIdAndUpdate(thread_id, thread[0]);

  res.status(201).redirect(`/threads/${thread_id}`);
});

exports.deleteThread = catchAsync(async (req, res, next) => {
  let thread_id = req.params.id;

  const [thread, _a] = await Thread.findById(thread_id);

  if (thread.length === 0) {
    return res.status(404).redirect("/feed");
  }

  await Thread.findByIdAndDelete(thread_id);

  res.status(201).redirect("/feed");
});
