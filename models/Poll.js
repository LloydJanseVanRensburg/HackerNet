const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class Poll {
  constructor(userId, forumId, title) {
    this.poll_id = uuidv4();
    this.user_id = userId;
    this.forum_id = forumId;
    this.title = title;
  }

  save() {
    let sqlA = `
      INSERT INTO polls(poll_id, user_id, forum_id, title)
      VALUES ( 
        ?,
        ?,
        ?,
        ?	
      );`;

    let placeholders = [this.poll_id, this.user_id, this.forum_id, this.title];

    return db.execute(sqlA, placeholders);
  }
}

module.exports = Poll;
