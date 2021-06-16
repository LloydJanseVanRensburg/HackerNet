const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class PollVote {
  constructor(userId, questionId, answerId) {
    this.vote_id = uuidv4();
    this.user_id = userId;
    this.question_id = questionId;
    this.answer_id = answerId;
  }

  save() {
    let sqlA = `
      INSERT INTO polls_votes(vote_id, user_id, question_id, answer_id)
      VALUES (
        'ae97094b-318a-44c4-a7d5-5a5b0df94646',
          'dca7d98b-abb9-492d-9691-e44d9e1814de',
          '52f714e6-981b-409e-8fec-13428f9652a5',
        'd82c7975-66e0-4b94-b194-d484f89885bd'
      );`;

    let placeholders = [
      this.vote_id,
      this.user_id,
      this.question_id,
      this.answer_id,
    ];

    return db.execute(sqlA, placeholders);
  }
}

module.exports = PollVote;
