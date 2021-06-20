const db = require("../config/db");

class PollQuestion {
  constructor(pollId, active, content) {
    this.poll_id = pollId;
    this.active = active;
    this.content = content;
  }

  save() {
    let sqlA = `
      INSERT INTO polls_questions(
        poll_id, 
        active, 
        content
      )
      VALUES (
        ?,
        ?,
        ?
      );`;

    let placeholders = [this.poll_id, this.active, this.content];

    return db.execute(sqlA, placeholders);
  }

  static findByPollId(pollId) {
    let sqlA = `
      SELECT * 
      FROM polls_questions 
      WHERE poll_id = ?`;

    let placeholders = [pollId];

    return db.execute(sqlA, placeholders);
  }

  static findByPollIdAndUpdate(pollId, questionData) {
    let sqlA = `
      UPDATE polls_questions
      SET 
        content = ?
      WHERE poll_id = ?`;

    let placeholders = [questionData, pollId];

    return db.execute(sqlA, placeholders);
  }
}

module.exports = PollQuestion;
