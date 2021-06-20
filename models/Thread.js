const db = require("../config/db");

class Thread {
  constructor(user_id, forum_id, title, body, image_url) {
    this.user_id = user_id;
    this.forum_id = forum_id;
    this.title = title;
    this.body = body;
    this.image_url = image_url;
  }

  save() {
    let sql = `
      INSERT INTO threads(
        user_id, 
        forum_id, 
        title, 
        body, 
        image_url
      ) 
      VALUES(
        ?,
        ?,
        ?,
        ?,
        ?
      );`;

    let placeholders = [
      this.user_id,
      this.forum_id,
      this.title,
      this.body,
      this.image_url,
    ];

    return db.execute(sql, placeholders);
  }

  static findById(threadId) {
    let sql = `
      SELECT * 
      FROM threads 
      WHERE thread_id = ?`;

    let placeholders = [threadId];

    return db.execute(sql, placeholders);
  }

  static findUserThreads(userId) {
    let sql = `
      SELECT 
        f.title as 'forum_title', 
        f.image_url as 'forum_image', 
        f.forum_id, u.first_name, 
        u.last_name,
        t.title as 'thread_title', 
        t.image_url as 'thread_image', 
        t.body, 
        t.thread_id, 
        t.created_at
      FROM threads t 
      INNER JOIN users u 
        ON 
          u.user_id = ? 
            AND 
          t.user_id = u.user_id 
      INNER JOIN forums f
        ON 
          f.forum_id = t.forum_id
      ORDER BY t.created_at;`;

    let placeholders = [userId];

    return db.execute(sql, placeholders);
  }

  static findThreadsComments(threadId) {
    let sqlA = `
      SELECT 
        c.comment_id as 'comment_id', 
        c.title, 
        c.body, 
        c.created_at, 
        c.user_id, 
        u.first_name, 
        u.last_name 
      FROM comments c 
      INNER JOIN threads t 
        ON 
          c.thread_id = ?  
            AND 
          c.thread_id = t.thread_id
      INNER JOIN users u 
        ON 
          c.user_id = u.user_id 
      ORDER BY c.created_at DESC;`;

    let placeholders = [threadId];

    return db.execute(sqlA, placeholders);
  }

  static findByIdAndDelete(threadId) {
    let sqlA = `
      DELETE 
      FROM threads 
      WHERE thread_id = ?`;

    let placeholders = [threadId];

    return db.execute(sqlA, placeholders);
  }

  static findByIdAndUpdate(threadId, threadData) {
    let sqlA = `
      UPDATE threads 
      SET 
        title = ?, 
        body = ?, 
        image_url = ? 
      WHERE thread_id = ?`;

    let placeholders = [
      threadData.title,
      threadData.body,
      threadData.image_url,
      threadId,
    ];

    return db.execute(sqlA, placeholders);
  }
}

module.exports = Thread;
