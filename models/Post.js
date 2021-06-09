const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class Post {
  constructor(title, body, userId) {
    this.title = title;
    this.body = body;
    this.userId = userId;
    this.id = uuidv4();
  }

  async save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1; // months is 0 indexed
    let dd = d.getDate();

    let currentDate = `${yyyy}-${mm}-${dd}`;

    let sql = `
    INSERT INTO posts(
      id,
      title,
      user_id,
      body,
      publish_date
    )
    VALUES(
      '${this.id}',
      '${this.title}',
      '${this.userId}',
      '${this.body}',
      '${currentDate}'
    );
    `;

    const savedPost = await db.execute(sql);

    return savedPost;
  }

  static findAll() {
    let sql = `"SELECT * FROM posts;"`;

    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM posts WHERE id = '${id}'`;

    return db.execute(sql);
  }

  static findByIdAndUpdate(id, updatedData) {}

  static findByIdAndDelete(id) {}
}

module.exports = Post;
