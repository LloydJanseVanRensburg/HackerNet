exports.getLoginPage = (req, res, next) => {
  let pageData = {
    pageTitle: "Login Page",
  };

  res.render("login", pageData);
};

exports.getRegisterPage = (req, res, next) => {
  let pageData = {
    pageTitle: "Register Page",
  };

  res.render("register", pageData);
};
