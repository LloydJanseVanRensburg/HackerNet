const catchAsync = require("../middleware/catchAsync");
const User = require("../models/User");

exports.getLoginPage = (req, res, next) => {
  let isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    return res.redirect("/");
  }

  let pageData = {
    pageTitle: "Login Page",
    isAuth: isLoggedIn,
    error: req.flash("error"),
    enterEmail: req.flash("enter_email")[0],
  };

  res.render("login", pageData);
};

exports.getRegisterPage = (req, res, next) => {
  let isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.redirect("/");
  }

  let pageData = {
    pageTitle: "Register Page",
    isAuth: isLoggedIn,
    error: req.flash("error"),
    enterEmail: req.flash("enter_email"),
    enterFName: req.flash("enter_fname"),
    enterLName: req.flash("enter_lname"),
  };

  res.render("register", pageData);
};

exports.loginUser = catchAsync(async (req, res, next) => {
  let { email, password } = req.body;

  // Check if user exists
  const [user, _a] = await User.isExistingUser(email);

  if (user.length === 0) {
    req.flash("error", "Incorrect password or email");
    req.flash("enter_email", email);
    return res.status(404).redirect("/auth/login");
  }

  // Check if password match
  const isMatch = await User.checkPasswordMatch(user[0].password, password);

  if (!isMatch) {
    req.flash("error", "Incorrect password or email");
    req.flash("enter_email", email);
    return res.status(403).redirect("/auth/login");
  }

  // Login user by redirecting to home screen and creating session
  req.session.isLoggedIn = true;
  req.session.userId = user[0].user_id;
  res.status(200).redirect("/feed");
});

exports.registerUser = catchAsync(async (req, res, next) => {
  let { firstName, lastName, email, password, confirmPassword } = req.body;

  let [user, _a] = await User.isExistingUser(email);

  if (user.length !== 0) {
    req.flash("error", "User already registered with this email");
    req.flash("enter_fname", firstName);
    req.flash("enter_lname", lastName);
    req.flash("enter_email", email);
    return res.status(400).redirect("/auth/register");
  }

  if (confirmPassword !== password) {
    req.flash("error", "Passwords don't match");
    req.flash("enter_fname", firstName);
    req.flash("enter_lname", lastName);
    req.flash("enter_email", email);
    return res.status(400).redirect("/auth/register");
  }

  let hashedPassword = await User.hashPassword(password);

  let newUser = new User(firstName, lastName, email, hashedPassword);

  const [result, _b] = await newUser.save();

  // Redirect to home and create session for this user
  req.session.isLoggedIn = true;
  req.session.userId = result.insertId;
  res.status(201).redirect("/feed");
});

exports.logoutUser = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};
