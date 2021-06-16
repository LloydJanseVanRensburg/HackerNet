const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class Comment {
  constructor(title, body, userId, threadId) {
    this.title = title;
    this.body = body;
    this.user_id = userId;
    this.thread_id = threadId;
    this.comment_id = uuidv4();
    this.created_at = new Date(Date.now());
  }

  save() {
    let sqlA =
      "INSERT INTO comments(comment_id, thread_id, user_id, title, body, created_at) VALUES(?, ?, ?, ?, ?, ?);";

    let placehoders = [
      this.comment_id,
      this.thread_id,
      this.user_id,
      this.title,
      this.body,
      this.created_at,
    ];

    return db.execute(sqlA, placehoders);
  }
}

module.exports = Comment;
