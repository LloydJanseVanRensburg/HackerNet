const User = require("../models/User");
const Thread = require("../models/Thread");
const Poll = require("../models/Poll");
const catchAsync = require("../middleware/catchAsync");

exports.profilePage = catchAsync(async (req, res, next) => {
  let user_id = req.user.user_id;

  const [user, _a] = await User.findById(user_id);
  const [threads, _b] = await Thread.findUserThreads(user_id);
  const polls = await Poll.findUserPolls(user_id);

  const postData = [...threads, ...polls];

  postData.sort((el1, el2) => {
    if (el1.created_at > el2.created_at) return -1;
    if (el1.created_at < el2.created_at) return 1;
    return 0;
  });

  let profileData = {
    postData,
    ...user[0],
  };

  let pageData = {
    pageTitle: "My Profile",
    isAuth: req.session.isLoggedIn,
    profileData,
  };

  res.status(200).render("profile", pageData);
});
