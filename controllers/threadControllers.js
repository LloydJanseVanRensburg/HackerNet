const Forum = require("../models/Forum");
const Thread = require("../models/Thread");

exports.getThreadPage = async (req, res, next) => {
  try {
    const [thread, _] = await Thread.findById(req.params.id);
    let ownsThread = false;

    if (thread.length === 0) {
      res.status(404).redirect("/feed");
    }

    if (thread[0].user_id === req.user.user_id) {
      ownsThread = true;
    }

    let pageData = {
      pageTitle: "Thread Page",
      isAuth: req.session.isLoggedIn,
      threadData: thread[0],
      ownsThread,
    };

    res.render("view-thread", pageData);
  } catch (error) {
    next(error);
  }
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
    let image_url = null;
    if (req.file) {
      image_url = req.file.path;
    }

    let user_id = req.user.user_id;

    const newThread = new Thread(user_id, forum, title, body, image_url);

    await newThread.save();

    res.redirect(`/threads/${newThread.thread_id}`);
  } catch (error) {
    next(error);
  }
};

exports.getEditThreadPage = async (req, res, next) => {
  try {
    let thread_id = req.params.id;
    let [threadData, _a] = await Thread.findById(thread_id);

    let pageData = {
      pageTitle: "Edit Thread",
      isAuth: true,
      threadData: threadData[0],
    };

    res.render("edit-thread", pageData);
  } catch (error) {
    next(error);
  }
};

exports.updateThreadById = async (req, res, next) => {
  try {
    let thread_id = req.params.id;
    let user_id = req.user.user_id;
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
  } catch (error) {
    next(error);
  }
};

exports.deleteThreadById = async (req, res, next) => {
  try {
    let thread_id = req.params.id;

    const [thread, _a] = await Thread.findById(thread_id);

    if (thread.length === 0) {
      return res.status(404).redirect("/feed");
    }

    await Thread.findByIdAndDelete(thread_id);

    res.status(201).redirect("/feed");
  } catch (error) {
    next(error);
  }
};
