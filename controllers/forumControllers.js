const Forum = require("../models/Forum");

exports.getForumsPage = async (req, res, next) => {
  try {
    const forumYouFollow = await Forum.findMyJoinedForums(req.session.userId);
    const [allForums, _] = await Forum.findAllForums();

    let pageData = {
      pageTitle: "Forums Page",
      isAuth: true,
      isAdmin: req.user.role === "Admin",
      forumYouFollow,
      allForums,
    };

    res.render("forums", pageData);
  } catch (error) {
    next(error);
  }
};

exports.getForumPage = async (req, res, next) => {
  try {
    const forum_id = req.params.id;

    const [forumData, _a] = await Forum.findById(forum_id);
    const [threadCount, _b] = await Forum.findAllThreads(forum_id);
    const [followerCount, _c] = await Forum.followerCount(forum_id);

    let pageData = {
      pageTitle: "Forum Page",
      isAuth: true,
      isAdmin: req.user.role === "Admin",
      forumData: forumData[0],
      followerCount: followerCount[0].count,
      threads: threadCount,
    };

    res.render("forum", pageData);
  } catch (error) {
    next(error);
  }
};

exports.getCreateForumPage = (req, res, next) => {
  let pageData = {
    pageTitle: "Create Forum Page",
    isAuth: true,
  };

  res.render("create-forum", pageData);
};

exports.createNewForum = async (req, res, next) => {
  const { title, description } = req.body;

  const image_url = req.file.path;

  try {
    const newForum = new Forum(title, description, image_url);

    await newForum.save();

    res.redirect(`/forums/${newForum.forum_id}`);
  } catch (error) {
    next(error);
  }
};

exports.getEditForumPage = (req, res, next) => {
  let pageData = {
    pageTitle: "Edit Forum Page",
    isAuth: true,
  };

  res.render("edit-forum", pageData);
};
