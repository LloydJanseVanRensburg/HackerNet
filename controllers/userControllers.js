const User = require("../models/User");
const Thread = require("../models/Thread");

exports.profilePage = async (req, res, next) => {
  try {
    const [user, _a] = await User.findById(req.user.user_id);
    const [threads, _b] = await Thread.findUserThreads(req.user.user_id);

    let profileData = {
      threads,
      ...user[0],
    };

    let pageData = {
      pageTitle: "My Profile",
      isAuth: req.session.isLoggedIn,
      profileData,
    };

    res.status(200).render("profile", pageData);
  } catch (error) {
    next(error);
  }
};
