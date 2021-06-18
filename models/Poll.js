const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class Poll {
  constructor(userId, forumId, title) {
    this.poll_id = uuidv4();
    this.user_id = userId;
    this.forum_id = forumId;
    this.title = title;
  }

  save() {
    let sqlA = `
      INSERT INTO polls(poll_id, user_id, forum_id, title)
      VALUES ( 
        ?,
        ?,
        ?,
        ?	
      );`;

    let placeholders = [this.poll_id, this.user_id, this.forum_id, this.title];

    return db.execute(sqlA, placeholders);
  }

  static findById(pollId) {
    let sqlA = "SELECT * FROM polls WHERE poll_id = ?";

    return db.execute(sqlA, [pollId]);
  }

  static findByIdAndUpdate(pollId, pollData) {
    let sqlA = `UPDATE polls 
     SET 
      title = ?, 
      forum_id = ?
     WHERE 
      poll_id = ?`;

    return db.execute(sqlA, [pollData.title, pollData.forum_id, pollId]);
  }

  static findByIdAndDelete(pollId) {
    let sqlA = "DELETE FROM polls WHERE poll_id = ?";

    return db.execute(sqlA, [pollId]);
  }

  static async findUserPolls(userId) {
    let sqlA = `
    SELECT
      p.poll_id AS 'poll_id', 
      p.created_at,
      p.title AS 'poll_title', 
      f.title AS 'forum_title', 
      f.image_url AS 'forum_image', 
      f.forum_id AS 'forum_id',
      pu.first_name AS 'creator_fname',
      pu.last_name AS 'creator_lname'
    FROM polls p
    INNER JOIN users u 
      ON 
        p.user_id = ?
      AND
        u.user_id = p.user_id
    INNER JOIN forums f
      ON 
        f.forum_id = p.forum_id
    INNER JOIN users pu
      ON 
        pu.user_id = p.user_id
    ORDER BY p.created_at DESC`;

    let [resA, _a] = await db.execute(sqlA, [userId]);

    for (let i = 0; i < resA.length; i++) {
      let sqlB = `
        SELECT
          pq.content AS 'question',
          pq.question_id,
          pq.active AS 'question_status',
          pa.content AS 'possible_answer',
          pa.answer_id,
          pa.active AS 'answer_status'
        FROM polls p
        INNER JOIN polls_questions pq
          ON
            p.poll_id = ? 
          AND 
            pq.poll_id = p.poll_id
        INNER JOIN polls_answers pa
          ON
            pa.question_id = pq.question_id
      `;

      const [resB, _b] = await db.execute(sqlB, [resA[i].poll_id]);

      let obj = {
        question: resB[0].question,
        question_id: resB[0].question_id,
        question_status: resB[0].question_status,
      };

      resB.forEach((question, idx) => {
        obj[`ans${idx + 1}`] = {
          answer_id: question.answer_id,
          answer: question.possible_answer,
        };
      });

      let sqlC = `SELECT * FROM polls_votes WHERE question_id = ? AND user_id = ?;`;

      const [resC, _c] = await db.execute(sqlC, [resB[0].question_id, userId]);

      if (resC.length > 0) {
        obj.userAnswer = resC[0].answer_id;
      }

      resA[i]["question"] = obj;
    }

    return resA;
  }
}

module.exports = Poll;
