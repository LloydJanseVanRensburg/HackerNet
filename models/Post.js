const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class Post {
  constructor(title, body, userId) {
    this.title = title;
    this.body = body;
    this.userId = userId;
    this.postId = uuidv4();
    this.createdAt = new Date(Date.now());
  }

  save() {
    let sql = `INSERT INTO posts(
      post_id,
      title,
      body,
      created_at,
      user_id
    )
    VALUES(?, ?, ?, ?, ?);`;

    const savedPost = db.execute(sql, [
      this.postId,
      this.title,
      this.body,
      this.createdAt,
      this.userId,
    ]);

    return savedPost;
  }

  static findAll() {
    let sql = `SELECT * FROM posts;`;

    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM posts WHERE id = ?`;

    return db.execute(sql, [id]);
  }

  static findByIdAndUpdate(id, updatedData) {}

  static findByIdAndDelete(id) {}
}

module.exports = Post;
