const Feed = require("../models/Feed");
const catchAsync = require("../middleware/catchAsync");

exports.feedPage = catchAsync(async (req, res, next) => {
  let myFeed = new Feed();

  let user_id = req.user.user_id;

  const [threadData, _a] = await myFeed.getMyFeedThreads(user_id);
  const pollData = await myFeed.getMyFeedPolls(user_id);

  const feedData = [...threadData, ...pollData];

  feedData.sort((el1, el2) => {
    if (el1.created_at > el2.created_at) return -1;
    if (el1.created_at < el2.created_at) return 1;
    return 0;
  });

  let pageData = {
    isAuth: true,
    pageTitle: "Feed Page",
    feedData,
  };

  res.render("feed", pageData);
});
