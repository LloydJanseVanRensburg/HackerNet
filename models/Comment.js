const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class Comment {
  constructor(title, body, userId, threadId) {
    this.commentId = uuidv4();
    this.title = title;
    this.body = body;
    this.userId = userId;
    this.threadId = threadId;
  }

  save() {}

  static findAll() {}

  static findById(id) {}

  static findByIdAndUpdate(id, updatedData) {}

  static findByIdAndDelete(id) {}
}

module.exports = Comment;
