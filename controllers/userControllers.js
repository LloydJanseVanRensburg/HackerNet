const User = require("../models/User");
const Thread = require("../models/Thread");

exports.getMyProfilePage = async (req, res, next) => {
  try {
    const [user, _a] = await User.findById(req.user.user_id);

    const [threads, _b] = await Thread.findUserThreads(req.user.user_id);

    let pageData = {
      pageTitle: "My Profile",
      isAuth: true,
      firstName: user[0].first_name,
      lastName: user[0].last_name,
      email: user[0].email,
      imageUrl: user[0].image_url,
      threads: threads,
    };

    res.render("profile", pageData);
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const [users, _] = await User.findAll();
    const result = {
      count: users.length,
      users,
    };
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
