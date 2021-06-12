const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class Forum {
  constructor(description, title, imageUrl) {
    this.forumId = uuidv4();
    this.createdAt = new Date(Date.now());
    this.description = description;
    this.title = title;
    this.imageUrl = imageUrl;
  }

  save() {}

  static findAll() {}

  static findById(id) {}

  static findByIdAndUpdate(id, updatedData) {}

  static findByIdAndDelete(id) {}
}

module.exports = Forum;
