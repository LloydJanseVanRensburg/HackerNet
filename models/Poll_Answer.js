const db = require("../config/db");

class PollAnswer {
  constructor(questionId, pollId, active, content) {
    this.question_id = questionId;
    this.poll_id = pollId;
    this.active = active;
    this.content = content;
  }

  save() {
    let sqlA = `
    INSERT INTO polls_answers(
      question_id, 
      poll_id, 
      active, 
      content
    )
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

  static findByQuestionId(questionId) {
    let sqlA = `
      SELECT * 
      FROM polls_answers 
      WHERE question_id = ?`;

    let placeholders = [questionId];

    return db.execute(sqlA, placeholders);
  }

  static async findByQuestionIdAndUpdate(questionId, answerData) {
    let sqlA = `
      SELECT * 
      FROM polls_answers 
      WHERE question_id = ?`;

    const [resA, _a] = await db.execute(sqlA, [questionId]);

    for (let i = 0; i < resA.length; i++) {
      let newContent = answerData[i];
      let answer_id = resA[i].answer_id;

      let sqlB = `
        UPDATE polls_answers 
        SET 
          content = ? 
        WHERE answer_id = ?`;

      await db.execute(sqlB, [newContent, answer_id]);
    }
  }
}

module.exports = PollAnswer;
