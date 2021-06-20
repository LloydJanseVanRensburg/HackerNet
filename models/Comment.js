const db = require("../config/db");

class Comment {
  constructor(title, body, userId, threadId) {
    this.title = title;
    this.body = body;
    this.user_id = userId;
    this.thread_id = threadId;
  }

  save() {
    let sqlA = `
      INSERT INTO comments(
        thread_id, 
        user_id, 
        title, 
        body
      ) 
      VALUES(
        ?, 
        ?, 
        ?, 
        ?
      );`;

    let placehoders = [this.thread_id, this.user_id, this.title, this.body];

    return db.execute(sqlA, placehoders);
  }

  static findById(commentId) {
    let sqlA = `
      SELECT * 
      FROM comments 
      WHERE comment_id = ?`;

    return db.execute(sqlA, [commentId]);
  }

  static findByIdAndDelete(commentId) {
    let sqlA = `
      DELETE FROM comments
      WHERE comment_id = ?`;

    return db.execute(sqlA, [commentId]);
  }
}

module.exports = Comment;
