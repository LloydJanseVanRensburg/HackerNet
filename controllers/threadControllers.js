exports.getThreadPage = (req, res, next) => {
  let pageData = {
    pageTitle: "Thread Page",
    isAuth: true,
    ownsThread: true,
  };

  res.render("view-thread", pageData);
};

exports.getCreateThreadPage = (req, res, next) => {
  let pageData = {
    pageTitle: "Create Thread",
    isAuth: true,
  };

  res.render("create-thread", pageData);
};

exports.getEditThreadPage = (req, res, next) => {
  let pageData = {
    pageTitle: "Edit Thread",
    isAuth: true,
  };

  res.render("edit-thread", pageData);
};
