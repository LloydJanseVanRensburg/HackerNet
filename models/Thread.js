const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class Thread {
  constructor(userId, forumId, title, body, imageUrl) {
    this.userId = userId;
    this.forumId = forumId;
    this.threadId = uuidv4();
    this.createdAt = new Date(Date.now());
    this.title = title;
    this.body = body;
    this.imageUrl = imageUrl;
  }

  save() {}

  static findAll() {}

  static findById(id) {}

  static findByIdAndUpdate(id, updatedData) {}

  static findByIdAndDelete(id) {}
}

module.exports = Thread;
