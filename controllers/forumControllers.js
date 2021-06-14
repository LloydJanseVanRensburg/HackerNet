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
    const user_id = req.user.user_id;

    const [forumData, _a] = await Forum.findById(forum_id);
    const [threads, _b] = await Forum.findAllForumThreads(forum_id);
    const [followerCount, _c] = await Forum.followerCount(forum_id);
    const [isForumFollower, _d] = await Forum.isForumFollower(
      forum_id,
      user_id
    );

    let pageData = {
      pageTitle: "Forum Page",
      isAuth: true,
      isAdmin: req.user.role === "Admin",
      forumData: forumData[0],
      followerCount: followerCount[0].count,
      threads: threads,
      forumFollower: isForumFollower[0].count,
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

exports.getEditForumPage = async (req, res, next) => {
  try {
    let forum_id = req.params.id;
    let [resA, _a] = await Forum.findById(forum_id);

    let pageData = {
      pageTitle: "Edit Forum Page",
      isAuth: req.session.isLoggedIn,
      forumData: resA[0],
    };

    res.render("edit-forum", pageData);
  } catch (error) {
    next(error);
  }
};

exports.editForumById = async (req, res, next) => {
  try {
    let { title, description } = req.body;
    let image_url;

    if (req.file) {
      image_url = req.file.path;
    }

    let forum_id = req.params.id;

    const [forum, _a] = await Forum.findById(forum_id);

    console.log({ before_forum: forum[0] });

    if (forum[0].length === 0) {
      return res.redirect(`/forums/${forum_id}`);
    }

    if (title) forum[0].title = title;
    if (description) forum[0].description = description;
    if (image_url) forum[0].image_url = image_url;

    await Forum.findByIdAndUpdate(forum_id, forum[0]);

    res.redirect(`/forums/${forum_id}`);
  } catch (error) {
    next(error);
  }
};

exports.deleteForumById = async (req, res, next) => {
  try {
    await Forum.deleteForumById(req.params.id);

    res.redirect("/forums");
  } catch (error) {
    next(error);
  }
};

exports.followForum = async (req, res, next) => {
  try {
    let forum_id = req.params.id;
    let user_id = req.user.user_id;

    await Forum.followForum(forum_id, user_id);

    res.redirect(`/forums/${forum_id}`);
  } catch (error) {
    next(error);
  }
};

exports.unfollowForum = async (req, res, next) => {
  try {
    let forum_id = req.params.id;
    let user_id = req.user.user_id;

    await Forum.unfollowForum(forum_id, user_id);

    res.redirect(`/forums/${forum_id}`);
  } catch (error) {
    next(error);
  }
};
