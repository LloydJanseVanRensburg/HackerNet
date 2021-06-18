const Forum = require("../models/Forum");
const Poll = require("../models/Poll");
const PollAnswer = require("../models/Poll_Answer");
const PollQuestion = require("../models/Poll_Question");
const PollVote = require("../models/Poll_Vote");

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

    res.status(201).redirect(`/polls/${poll_id}`);
  } catch (error) {
    next(error);
  }
};

exports.pollPage = async (req, res, next) => {
  try {
    let poll_id = req.params.id;
    let user_id = req.user.user_id;

    let [poll, _a] = await Poll.findById(poll_id);

    let [poll_question, _b] = await PollQuestion.findByPollId(poll_id);
    let [poll_answers, _c] = await PollAnswer.findByQuestionId(
      poll_question[0].question_id
    );
    let [poll_vote, _d] = await PollVote.findUserVoteForQuestion(
      user_id,
      poll_question[0].question_id
    );

    if (poll_vote.length > 0) {
      poll_vote = poll_vote[0];
    } else {
      poll_vote = null;
    }

    let pageData = {
      pageTitle: "View Poll",
      isAuth: req.session.isLoggedIn,
      userId: user_id,
      poll: poll[0],
      poll_question: poll_question[0],
      poll_answers,
      poll_vote,
    };

    res.status(200).render("view-poll", pageData);
  } catch (error) {
    next(error);
  }
};

exports.createPollVote = async (req, res, next) => {
  try {
    let { answer } = req.body;
    let question_id = req.params.questionId;
    let user_id = req.user.user_id;

    let [pollVote, _a] = await PollVote.findUserVoteForQuestion(
      user_id,
      question_id
    );

    if (pollVote.length > 0) {
      await PollVote.findByIdAndUpdate(pollVote[0].vote_id, answer);
    } else {
      pollVote = new PollVote(user_id, question_id, answer);
      await pollVote.save();
    }

    res.status(201).redirect("/feed");
  } catch (error) {
    next(error);
  }
};

exports.updatePollPage = async (req, res, next) => {
  try {
    let poll_id = req.params.id;
    let user_id = req.user.user_id;

    let [pollData, _a] = await Poll.findById(poll_id);

    if (pollData.length === 0) {
      return res.status(404).redirect("/feed");
    }

    if (pollData[0].user_id !== user_id) {
      return res.status(403).redirect("/feed");
    }

    let [questionData, _b] = await PollQuestion.findByPollId(poll_id);

    let question_id = questionData[0].question_id;

    let [answerData, _c] = await PollAnswer.findByQuestionId(question_id);

    let forumsYouFollow = await Forum.findMyJoinedForums(user_id);

    let pageData = {
      pageTitle: "Edit Poll",
      isAuth: req.session.isLoggedIn,
      pollData: pollData[0],
      questionData: questionData[0],
      answerData,
      forumsYouFollow,
    };

    res.status(200).render("edit-poll", pageData);
  } catch (error) {
    next(error);
  }
};

exports.updatePoll = async (req, res, next) => {
  try {
    let { forum, title, question, ans1, ans2, ans3 } = req.body;
    let poll_id = req.params.id;

    const [resA, _a] = await Poll.findById(poll_id);

    if (resA.length === 0) {
      return res.status(404).redirect("/feed");
    }

    await Poll.findByIdAndUpdate(poll_id, {
      forum_id: forum,
      title,
    });

    const [questionData, _b] = await PollQuestion.findByPollId(poll_id);

    if (questionData.length === 0) {
      return res.status(404).redirect("/feed");
    }

    await PollQuestion.findByPollIdAndUpdate(poll_id, question);

    await PollAnswer.findByQuestionIdAndUpdate(questionData[0].question_id, [
      ans1,
      ans2,
      ans3,
    ]);

    res.status(201).redirect(`/polls/${poll_id}`);
  } catch (error) {
    next(error);
  }
};

exports.deletePoll = async (req, res, next) => {
  try {
    let poll_id = req.params.id;
    let user_id = req.user.user_id;

    let [resA, _a] = await Poll.findById(poll_id);

    if (resA.length === 0) {
      return res.status(404).redirect("/feed");
    }

    if (resA[0].user_id !== user_id) {
      return res.status(403).redirect("/feed");
    }

    await Poll.findByIdAndDelete(poll_id);

    res.status(204).redirect("/feed");
  } catch (error) {
    next(error);
  }
};
