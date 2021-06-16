const Forum = require("../models/Forum");
const Poll = require("../models/Poll");
const PollAnswer = require("../models/Poll_Answer");
const PollQuestion = require("../models/Poll_Question");

exports.createNewPollPage = async (req, res, next) => {
  try {
    let user_id = req.user.user_id;

    const forumsYouFollow = await Forum.findMyJoinedForums(user_id);

    let pageData = {
      pageTitle: "Create Poll",
      isAuth: req.session.isLoggedIn,
      forumsYouFollow,
    };

    res.status(200).render("create-poll", pageData);
  } catch (error) {
    next(error);
  }
};

exports.createNewPoll = async (req, res, next) => {
  try {
    let { forum, title, question, ans1, ans2, ans3 } = req.body;
    let user_id = req.user.user_id;

    console.log({ forum, title, question, ans1, ans2, ans3, user_id });

    // Create a poll
    const poll = new Poll(user_id, forum, title);
    await poll.save();

    let poll_id = poll.poll_id;

    // Add questions to poll
    const poll_question = new PollQuestion(poll_id, 1, question);
    await poll_question.save();

    let question_id = poll_question.question_id;

    // Add answers to poll
    const answer1 = new PollAnswer(question_id, poll_id, 1, ans1);
    await answer1.save();

    const answer2 = new PollAnswer(question_id, poll_id, 1, ans2);
    await answer2.save();

    const answer3 = new PollAnswer(question_id, poll_id, 1, ans3);
    await answer3.save();

    res.send("Working on it...");
    // res.status(201).redirect(`/polls/${poll_id}`)
  } catch (error) {
    next(error);
  }
};
