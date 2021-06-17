const db = require("../config/db");

class Feed {
  async getMyFeedThreads(userId) {
    let sqlA = `
    SELECT 
      t.thread_id AS 'thread_id', 
      t.created_at,
      t.title AS 'thread_title', 
      t.body, 
      t.image_url AS 'thread_image', 
      f.title AS 'forum_title', 
      f.image_url AS 'forum_image', 
      f.forum_id AS 'forum_id',
      tu.first_name AS 'creator_fname',
      tu.last_name AS 'creator_lname'
    FROM forums_followers ff
    INNER JOIN users u 
      ON 
        ff.user_id = ?
      AND
        u.user_id = ff.user_id
    INNER JOIN forums f
      ON 
        f.forum_id = ff.forum_id
    INNER JOIN threads t 
      ON 
        t.forum_id = f.forum_id
    INNER JOIN users tu
      ON 
        tu.user_id = t.user_id
    ORDER BY t.created_at DESC;
    `;

    return db.execute(sqlA, [userId]);
  }

  async getMyFeedPolls(userId) {
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
    FROM forums_followers ff
    INNER JOIN users u 
      ON 
        ff.user_id = ?
      AND
        u.user_id = ff.user_id
    INNER JOIN forums f
      ON 
        f.forum_id = ff.forum_id
    INNER JOIN polls p 
      ON 
        p.forum_id = f.forum_id
    INNER JOIN users pu
      ON 
        pu.user_id = p.user_id
    ORDER BY p.created_at DESC;
    `;

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
            p.poll_id = ? AND pq.poll_id = p.poll_id
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

module.exports = Feed;
