const db = require("../config/db");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

class User {
  constructor(firstName, lastName, email, password) {
    this.userId = uuidv4();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.createdAt = new Date(Date.now());
  }

  save() {
    let sql = `INSERT INTO users(user_id, first_name, last_name, email, created_at, password, role) VALUES (?,?,?,?,?,?,?);`;
    let placeholders = [
      this.userId,
      this.firstName,
      this.lastName,
      this.email,
      this.createdAt,
      this.password,
      "User",
    ];

    return db.execute(sql, placeholders);
  }

  static findById(id) {
    return db.execute("SELECT * FROM users WHERE user_id = ?", [id]);
  }

  static checkPasswordMatch(dbPassword, userPassword) {
    return bcrypt.compare(userPassword, dbPassword);
  }

  static hashPassword(strPassword) {
    return bcrypt.hash(strPassword, 12);
  }
}

module.exports = User;
