const db = require("../config/db");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

class User {
  constructor(username, email, password, dob) {
    this.id = uuidv4();
    this.username = username;
    this.email = email;
    this.password = password;
    this.dob = dob;
  }

  async save() {
    this.password = await bcrypt.hash(this.password, 12);

    let sql = `
    INSERT INTO users(id, username, email, password, dob)
    VALUES (
      '${this.id}',
      '${this.username}',
      '${this.email}',
      '${this.password}',
      '${this.dob}'
    );`;

    const newUser = await db.execute(sql);
    return newUser;
  }

  static findAll() {
    return db.execute("SELECT * FROM users;");
  }

  static findById(id) {
    let sql = `SELECT * FROM users WHERE id = '${id}'`;

    return db.execute(sql);
  }

  static findByIdAndUpdate(id, newData) {
    // Run select query for a specific user
    // Close conneciton
    // Return found user
  }

  static findByIdAndDelete(id) {
    // Connect to database
    // Run select query for a specific user
    // Close conneciton
    // Return found user
  }
}

module.exports = User;
