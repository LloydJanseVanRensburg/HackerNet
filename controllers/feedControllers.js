exports.getFeedPage = (req, res, next) => {
  let pageData = {
    isAuth: true,
    pageTitle: "Feed Page",
  };
  res.render("feed", pageData);
};
