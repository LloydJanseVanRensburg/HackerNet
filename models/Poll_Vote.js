const db = require("../config/db");

class PollVote {
  constructor(userId, questionId, answerId) {
    this.user_id = userId;
    this.question_id = questionId;
    this.answer_id = answerId;
  }

  async save() {
    let sqlA = `
      INSERT INTO polls_votes(
        user_id, 
        question_id, 
        answer_id
      )
      VALUES (
        ?,
        ?,
        ?
      );`;

    let placeholders = [this.user_id, this.question_id, this.answer_id];

    return db.execute(sqlA, placeholders);
  }

  static findByIdAndUpdate(voteId, answerId) {
    let sqlA = `
      UPDATE polls_votes 
      SET 
        answer_id = ? 
      WHERE vote_id = ?`;

    let placeholders = [answerId, voteId];

    return db.execute(sqlA, placeholders);
  }

  static findUserVoteForQuestion(userId, questionId) {
    let sqlA = `
      SELECT * 
      FROM polls_votes 
      WHERE 
        user_id = ? 
          AND 
        question_id = ?`;

    let placeholders = [userId, questionId];

    return db.execute(sqlA, placeholders);
  }
}

module.exports = PollVote;
