exports.getForumsPage = (req, res, next) => {
  let pageData = {
    pageTitle: "Forums Page",
    isAuth: true,
    isAdmin: true,
    following: 3,
    totalAmount: 8,
  };

  res.render("forums", pageData);
};

exports.getForumPage = (req, res, next) => {
  let pageData = {
    pageTitle: "Forum Page",
    isAuth: true,
    isAdmin: true,
    followers: 300,
    threadCount: 17,
  };

  res.render("forum", pageData);
};

exports.getCreateForumPage = (req, res, next) => {
  let pageData = {
    pageTitle: "Create Forum Page",
    isAuth: true,
  };

  res.render("create-forum", pageData);
};

exports.getEditForumPage = (req, res, next) => {
  let pageData = {
    pageTitle: "Edit Forum Page",
    isAuth: true,
  };

  res.render("edit-forum", pageData);
};
