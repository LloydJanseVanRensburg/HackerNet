const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class Forum {
  constructor(title, description, image_url) {
    this.forum_id = uuidv4();
    this.created_at = new Date(Date.now());
    this.title = title;
    this.description = description;
    this.image_url = image_url;
  }

  save() {
    let sql =
      "INSERT INTO forums(forum_id, description, title, created_at, image_url) VALUES(?,?,?,?,?);";

    return db.execute(sql, [
      this.forum_id,
      this.description,
      this.title,
      this.created_at,
      this.image_url,
    ]);
  }

  static findById(forumId) {
    let sql = "SELECT * FROM forums WHERE forum_id = ?";

    return db.execute(sql, [forumId]);
  }

  static findAllThreads(forumId) {
    let sql = "SELECT * FROM threads WHERE forum_id = ?";

    return db.execute(sql, [forumId]);
  }

  static followerCount(forumId) {
    let sql =
      "SELECT Count(*) as count FROM forums_followers WHERE forum_id = ?";

    return db.execute(sql, [forumId]);
  }

  static findAllForums() {
    let sql = "SELECT f.forum_id, f.title, f.image_url FROM forums f;";

    return db.execute(sql);
  }

  static async findMyJoinedForums(userId) {
    // Find all the forum titles and forum image_urls that user_id is following

    let followForumIDs =
      "SELECT forum_id FROM forums_followers ff WHERE ff.user_id = ?;";

    const [forumIDS, _] = await db.execute(followForumIDs, [userId]);

    let myFollowingForumsData = [];

    for (let i = 0; i < forumIDS.length; i++) {
      let sql = `SELECT f.forum_id, f.title, f.image_url FROM forums f WHERE f.forum_id = '${forumIDS[i].forum_id}'`;

      const [forum, _] = await db.execute(sql);

      let forumData = {
        forum_id: forum[0].forum_id,
        title: forum[0].title,
        image_url: forum[0].image_url,
      };

      myFollowingForumsData.push(forumData);
    }

    return myFollowingForumsData;
  }
}

module.exports = Forum;
