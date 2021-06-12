const User = require("../models/User");

exports.getMyProfilePage = (req, res, next) => {
  let pageData = {
    pageTitle: "My Profile",
    isAuth: true,
    totalAmount: 1,
  };

  res.render("profile", pageData);
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
