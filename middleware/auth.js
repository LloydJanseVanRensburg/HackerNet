const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let session = req.session;

  if (!session.isLoggedIn) {
    return res.redirect("/auth/login");
  }

  const [user, _] = await User.findById(req.session.userId);

  req.user = user[0];

  next();
};

// Grant Access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.redirect("/feed");
    }
    next();
  };
};
