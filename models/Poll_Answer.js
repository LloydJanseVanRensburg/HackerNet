const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class PollAnswer {
  constructor(questionId, pollId, active, content) {
    this.answer_id = uuidv4();
    this.question_id = questionId;
    this.poll_id = pollId;
    this.active = active;
    this.content = content;
  }

  save() {
    let sqlA = `
    INSERT INTO polls_answers(answer_id, question_id, poll_id, active, content)
    VALUES (
      ?,
      ?,
      ?,
      ?,
      ?
    );`;

    let placeholders = [
      this.answer_id,
      this.question_id,
      this.poll_id,
      this.active,
      this.content,
    ];

    return db.execute(sqlA, placeholders);
  }
}

module.exports = PollAnswer;
