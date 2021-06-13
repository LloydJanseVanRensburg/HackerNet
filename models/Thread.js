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

  static findUserThreads(userId) {
    let sql = "SELECT * FROM threads WHERE user_id = ?;";

    return db.execute(sql, [userId]);
  }
}

module.exports = Thread;
