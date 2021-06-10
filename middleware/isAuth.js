const isAuth = (req, res, next) => {
  let session = req.session;

  if (!session.isLoggedIn) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  next();
};

module.exports = isAuth;
