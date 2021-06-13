const Forum = require("../models/Forum");
const Thread = require("../models/Thread");

exports.getThreadPage = (req, res, next) => {
  let pageData = {
    pageTitle: "Thread Page",
    isAuth: true,
    ownsThread: true,
  };

  res.render("view-thread", pageData);
};

exports.getCreateThreadPage = async (req, res, next) => {
  try {
    const forumsYouFollow = await Forum.findMyJoinedForums(req.user.user_id);

    let pageData = {
      pageTitle: "Create Thread Page",
      isAuth: true,
      forumsYouFollow,
    };

    res.render("create-thread", pageData);
  } catch (error) {
    next(error);
  }
};

exports.createNewThread = async (req, res, next) => {
  try {
    let { forum, title, body } = req.body;
    let image_url = req.file.path;
    let user_id = req.user.user_id;

    const newThread = new Thread(user_id, forum, title, body, image_url);

    await newThread.save();

    res.redirect(`/threads/${newThread.thread_id}`);
  } catch (error) {
    next(error);
  }
};

exports.getEditThreadPage = (req, res, next) => {
  let pageData = {
    pageTitle: "Edit Thread",
    isAuth: true,
  };

  res.render("edit-thread", pageData);
};
