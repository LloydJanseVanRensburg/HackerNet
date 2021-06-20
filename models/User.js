const db = require("../config/db");
const bcrypt = require("bcryptjs");

class User {
  constructor(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  save() {
    let sql = `
      INSERT INTO users(
        first_name, 
        last_name, 
        email, 
        password
      ) 
      VALUES (
        ?,
        ?,
        ?,
        ?
      );`;

    let placeholders = [
      this.firstName,
      this.lastName,
      this.email,
      this.password,
    ];

    return db.execute(sql, placeholders);
  }

  static findById(userId) {
    let sqlA = `
      SELECT * 
      FROM users 
      WHERE user_id = ?;`;

    let placeholders = [userId];

    return db.execute(sqlA, placeholders);
  }

  static isExistingUser(email) {
    let sqlA = `
      SELECT * 
      FROM users 
      WHERE email = ?`;

    let placeholders = [email];

    return db.execute(sqlA, placeholders);
  }

  static checkPasswordMatch(dbPassword, userPassword) {
    return bcrypt.compare(userPassword, dbPassword);
  }

  static hashPassword(strPassword) {
    return bcrypt.hash(strPassword, 12);
  }
}

module.exports = User;
