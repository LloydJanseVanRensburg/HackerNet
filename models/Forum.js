const db = require("../config/db");

class Forum {
  constructor(title, description, image_url) {
    this.title = title;
    this.description = description;
    this.image_url = image_url;
  }

  save() {
    let sql = `
    INSERT INTO forums(
      description, 
      title, 
      image_url
    ) 
    VALUES(
      ?,
      ?,
      ?
    );`;

    let placeholders = [this.description, this.title, this.image_url];

    return db.execute(sql, placeholders);
  }

  static findById(forumId) {
    let sql = `
      SELECT * 
      FROM forums 
      WHERE forum_id = ?`;

    let placeholders = [forumId];
    return db.execute(sql, placeholders);
  }

  static async findByIdAndUpdate(forumId, forumData) {
    let sqlA = `
      SELECT * 
      FROM forums 
      WHERE forum_id = ?`;

    const [resA, _a] = await db.execute(sqlA, [forumId]);

    if (resA.length === 0) {
      return next(new Error(`No forum with id: ${forumId} was found`));
    }

    let sqlB = `
      UPDATE forums 
      SET description = ?, 
        title = ?, 
        image_url = ? 
      WHERE forum_id = ?`;

    let placeholders = [
      forumData.description,
      forumData.title,
      forumData.image_url,
      forumId,
    ];

    return db.execute(sqlB, placeholders);
  }

  static async deleteForumById(forumId) {
    let sqlA = `
      SELECT * 
      FROM forums 
      WHERE forum_id = ?`;

    const [resA, _a] = await db.execute(sqlA, [forumId]);

    if (resA.length === 0) {
      return next(new Error(`No forum with id: ${forumId} was found`));
    }

    let sqlB = `
      DELETE 
      FROM forums 
      WHERE forum_id = ?`;

    let placeholders = [forumId];

    return db.execute(sqlB, placeholders);
  }

  static isForumFollower(forumId, userId) {
    let sqlA = `
      SELECT Count(*) as 'count' 
      FROM forums_followers 
      WHERE 
        forum_id = ? 
          AND 
        user_id = ?`;

    let placeholders = [forumId, userId];

    return db.execute(sqlA, placeholders);
  }

  static followForum(forumId, userId) {
    let sqlA = `
      INSERT INTO forums_followers(
        forum_id, 
        user_id
      ) 
      VALUES(
        ?, 
        ? 
      )`;

    let placeholders = [forumId, userId];

    return db.execute(sqlA, placeholders);
  }

  static unfollowForum(forumId, userId) {
    let sqlA = `
      DELETE 
      FROM forums_followers 
      WHERE 
        forum_id = ? 
          AND 
        user_id = ?`;

    let placeholders = [forumId, userId];

    return db.execute(sqlA, placeholders);
  }

  static findAllForumThreads(forumId) {
    let sql = `
        SELECT 
        t.title AS 'thread_title', 
        t.image_url AS 'thread_image', 
        t.thread_id, 
        t.body, 
        t.created_at, 
        u.first_name AS 'creator_fname', 
        u.last_name AS 'creator_lname', 
        u.user_id, 
        f.title AS 'forum_title', 
        f.forum_id, 
        f.image_url AS 'forum_image' 
        FROM threads t 
        INNER JOIN users u 
          ON 
            u.user_id = t.user_id 
        INNER JOIN forums f 
          ON 
            t.forum_id = f.forum_id 
          AND 
            f.forum_id = ?`;

    let placeholders = [forumId];

    return db.execute(sql, placeholders);
  }

  static async findAllForumPolls(forumId, userId) {
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
      INNER JOIN forums f
        ON 
          f.forum_id = ?
        AND
          p.forum_id = f.forum_id
      INNER JOIN users pu
        ON
          pu.user_id = p.user_id
      ORDER BY p.created_at DESC`;

    let [resA, _a] = await db.execute(sqlA, [forumId]);

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
            pa.question_id = pq.question_id;`;

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

      let sqlC = `
        SELECT * 
        FROM polls_votes 
        WHERE 
          question_id = ? 
            AND 
          user_id = ?;`;

      const [resC, _c] = await db.execute(sqlC, [resB[0].question_id, userId]);

      if (resC.length > 0) {
        obj.userAnswer = resC[0].answer_id;
      }

      resA[i]["question"] = obj;
    }

    return resA;
  }

  static followerCount(forumId) {
    let sql = `
      SELECT Count(*) as count 
      FROM forums_followers 
      WHERE forum_id = ?`;

    let placeholders = [forumId];

    return db.execute(sql, placeholders);
  }

  static findAllForums() {
    let sql = `
      SELECT * 
      FROM forums;`;

    return db.execute(sql);
  }

  static async findMyJoinedForums(userId) {
    let followForumIDs = `
      SELECT forum_id 
      FROM forums_followers 
      WHERE user_id = ?;`;

    const [forumIDS, _] = await db.execute(followForumIDs, [userId]);

    let myFollowingForumsData = [];

    for (let i = 0; i < forumIDS.length; i++) {
      let sql = `
        SELECT 
          forum_id, 
          title, 
          image_url 
        FROM forums
        WHERE forum_id = ?`;

      const [forum, _] = await db.execute(sql, [forumIDS[i].forum_id]);

      let forumData = {
        forum_id: forum[0].forum_id,
        title: forum[0].title,
        image_url: forum[0].image_url,
      };

      myFollowingForumsData.push(forumData);
    }

    return myFollowingForumsData;
  }
}

module.exports = Forum;
