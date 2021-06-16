const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class PollQuestion {
  constructor(pollId, active, content) {
    this.question_id = uuidv4();
    this.poll_id = pollId;
    this.active = active;
    this.content = content;
  }

  save() {
    let sqlA = `
    INSERT INTO polls_questions(question_id, poll_id, active, content)
    VALUES (
      ?,
      ?,
      ?,
      ?
    );`;

    let placeholders = [
      this.question_id,
      this.poll_id,
      this.active,
      this.content,
    ];

    return db.execute(sqlA, placeholders);
  }
}

module.exports = PollQuestion;
