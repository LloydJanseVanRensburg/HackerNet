const Forum = require("../models/Forum");
const catchAsync = require("../middleware/catchAsync");

exports.forumsPage = catchAsync(async (req, res, next) => {
  const forumYouFollow = await Forum.findMyJoinedForums(req.session.userId);
  const [allForums, _] = await Forum.findAllForums();

  let pageData = {
    pageTitle: "Forums Page",
    isAuth: true,
    isAdmin: req.user.role === "Admin",
    forumYouFollow,
    allForums,
  };

  res.status(200).render("forums", pageData);
});

exports.forumPage = catchAsync(async (req, res, next) => {
  const forum_id = req.params.id;
  const user_id = req.user.user_id;

  const [forumData, _a] = await Forum.findById(forum_id);
  const [threads, _b] = await Forum.findAllForumThreads(forum_id);
  const polls = await Forum.findAllForumPolls(forum_id, user_id);
  const [followerCount, _d] = await Forum.followerCount(forum_id);
  const [isForumFollower, _e] = await Forum.isForumFollower(forum_id, user_id);

  let forumPosts = [...polls, ...threads];

  forumPosts.sort((el1, el2) => {
    if (el1.created_at > el2.created_at) return -1;
    if (el1.created_at < el2.created_at) return 1;
    return 0;
  });

  let pageData = {
    pageTitle: "Forum Page",
    isAuth: true,
    isAdmin: req.user.role === "Admin",
    forumData: forumData[0],
    followerCount: followerCount[0].count,
    forumPosts,
    forumFollower: isForumFollower[0].count,
  };

  res.status(200).render("forum", pageData);
});

exports.createNewForumPage = (req, res, next) => {
  let pageData = {
    pageTitle: "Create Forum Page",
    isAuth: true,
  };

  res.status(200).render("create-forum", pageData);
};

exports.createNewForum = catchAsync(async (req, res, next) => {
  const { title, description } = req.body;

  let image_url;

  if (req.file) {
    image_url = req.file.path;
  }

  const newForum = new Forum(title, description, image_url);

  const [result, _a] = await newForum.save();

  res.status(201).redirect(`/forums/${result.insertId}`);
});

exports.editForumPage = catchAsync(async (req, res, next) => {
  let forum_id = req.params.id;
  let [resA, _a] = await Forum.findById(forum_id);

  let pageData = {
    pageTitle: "Edit Forum Page",
    isAuth: req.session.isLoggedIn,
    forumData: resA[0],
  };

  res.status(200).render("edit-forum", pageData);
});

exports.editForum = catchAsync(async (req, res, next) => {
  let { title, description } = req.body;
  let image_url;

  if (req.file) {
    image_url = req.file.path;
  }

  let forum_id = req.params.id;

  const [forum, _a] = await Forum.findById(forum_id);

  if (forum[0].length === 0) {
    return res.status(404).redirect(`/forums/${forum_id}`);
  }

  if (title) forum[0].title = title;
  if (description) forum[0].description = description;
  if (image_url) forum[0].image_url = image_url;

  await Forum.findByIdAndUpdate(forum_id, forum[0]);

  res.status(201).redirect(`/forums/${forum_id}`);
});

exports.deleteForum = catchAsync(async (req, res, next) => {
  await Forum.deleteForumById(req.params.id);

  res.status(204).redirect("/forums");
});

exports.addForumFollower = catchAsync(async (req, res, next) => {
  let forum_id = req.params.id;
  let user_id = req.user.user_id;

  await Forum.followForum(forum_id, user_id);

  res.status(201).redirect(`/forums/${forum_id}`);
});

exports.removeForumFollower = catchAsync(async (req, res, next) => {
  let forum_id = req.params.id;
  let user_id = req.user.user_id;

  await Forum.unfollowForum(forum_id, user_id);

  res.status(204).redirect(`/forums/${forum_id}`);
});
