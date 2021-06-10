const db = require("../config/db");
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
  try {
    let { email, password } = req.body;
    // Check if user exists
    let sql = "SELECT * FROM users WHERE email = ?;";
    const [user, _] = await db.execute(sql, [email]);

    if (!user || user.length === 0) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    // Check if password match
    const isMatch = await User.checkPasswordMatch(user[0].password, password);

    if (!isMatch) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    // Login user by redirecting to home screen and creating session
    req.session.isLoggedIn = true;
    req.session.userId = user[0].user_id;
    res.status(200).json({ message: "User logged In" });
  } catch (error) {
    next(error);
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    let { firstName, lastName, email, password } = req.body;

    let newUser = new User(firstName, lastName, email, password);

    newUser = await newUser.save();

    // Redirect to home and create session for this user
    res.status(201).json({ user: newUser });
  } catch (error) {
    next(error);
  }
};

exports.getMyFeedPage = (req, res, next) => {
  let pageData = {
    pageTitle: "My Feed",
  };

  res.render("feed", pageData);
};

exports.getMyProfilePage = (req, res, next) => {
  let pageData = {
    pageTitle: "My Profile",
  };

  res.render("profile", pageData);
};
