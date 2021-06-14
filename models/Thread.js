const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class Thread {
  constructor(user_id, forum_id, title, body, image_url) {
    this.thread_id = uuidv4();
    this.created_at = new Date(Date.now());
    this.user_id = user_id;
    this.forum_id = forum_id;
    this.title = title;
    this.body = body;
    this.image_url = image_url;
  }

  save() {
    let sql =
      "INSERT INTO threads(thread_id, user_id, forum_id, title, body, image_url, created_at) VALUES(?,?,?,?,?,?,?);";

    return db.execute(sql, [
      this.thread_id,
      this.user_id,
      this.forum_id,
      this.title,
      this.body,
      this.image_url,
      this.created_at,
    ]);
  }

  static findById(threadId) {
    let sql = "SELECT * FROM threads WHERE thread_id = ?";

    return db.execute(sql, [threadId]);
  }

  static findUserThreads(userId) {
    let sql = `SELECT f.title as 'forum_title', f.image_url as 'forum_image', f.forum_id, u.first_name, u.last_name, 
               t.title as 'thread_title', t.image_url as 'thread_image', t.body, t.thread_id, t.created_at
               FROM threads t 
               INNER JOIN users u 
               ON u.user_id = ? AND t.user_id = u.user_id 
               INNER JOIN forums f
               ON f.forum_id = t.forum_id
               ORDER BY t.created_at;`;

    return db.execute(sql, [userId]);
  }

  static findByIdAndDelete(threadId) {
    let sqlA = "DELETE FROM threads WHERE thread_id = ?";

    return db.execute(sqlA, [threadId]);
  }

  static findByIdAndUpdate(threadId, threadData) {
    let sqlA =
      "UPDATE threads SET title = ?, body = ?, image_url = ? WHERE thread_id = ?";

    return db.execute(sqlA, [
      threadData.title,
      threadData.body,
      threadData.image_url,
      threadId,
    ]);
  }
}

module.exports = Thread;
