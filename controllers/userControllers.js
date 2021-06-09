const User = require("../models/User");

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

exports.loginUser = async (req, res, next) => {
  res.send("Login User Route");
};

exports.registerUser = async (req, res, next) => {
  res.send("Register User Route");
};
