const Feed = require("../models/Feed");

exports.feedPage = async (req, res, next) => {
  try {
    let myFeed = new Feed();

    let user_id = req.user.user_id;

    const [feedData, _a] = await myFeed.getMyFeedData(user_id);

    let pageData = {
      isAuth: true,
      pageTitle: "Feed Page",
      feedData,
    };

    res.render("feed", pageData);
  } catch (error) {
    next(error);
  }
};
