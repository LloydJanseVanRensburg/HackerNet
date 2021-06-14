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

  static async findByIdAndUpdate(forumId, forumData) {
    try {
      let sqlA = "SELECT Count(*) FROM forums WHERE forum_id = ?";

      const [resA, _a] = await db.execute(sqlA, [forumId]);

      if (resA.length === 0) {
        return next(new Error(`No forum with id: ${forumId} was found`));
      }

      let sqlB =
        "UPDATE forums SET description = ?, title = ?, image_url = ? WHERE forum_id = ?";

      return db.execute(sqlB, [
        forumData.description,
        forumData.title,
        forumData.image_url,
        forumId,
      ]);
    } catch (error) {
      next(error);
    }
  }

  static async deleteForumById(forumId) {
    let sqlA = "SELECT Count(*) FROM forums WHERE forum_id = ?";

    const [resA, _a] = await db.execute(sqlA, [forumId]);

    if (resA.length === 0) {
      return next(new Error(`No forum with id: ${forumId} was found`));
    }

    let sqlB = "DELETE FROM forums WHERE forum_id = ?";

    return db.execute(sqlB, [forumId]);
  }

  static isForumFollower(forumId, userId) {
    let sqlA =
      "SELECT Count(*) as 'count' FROM forums_followers WHERE forum_id = ? AND user_id = ?";

    return db.execute(sqlA, [forumId, userId]);
  }

  static followForum(forumId, userId) {
    let sqlA =
      "INSERT INTO forums_followers(forum_id, user_id, created_at) VALUES(?, ?, ?)";

    let createdAt = new Date(Date.now());

    return db.execute(sqlA, [forumId, userId, createdAt]);
  }

  static unfollowForum(forumId, userId) {
    let sqlA =
      "DELETE FROM forums_followers WHERE forum_id = ? AND user_id = ?";

    return db.execute(sqlA, [forumId, userId]);
  }

  static findAllForumThreads(forumId) {
    let sql =
      "SELECT t.title as 'thread_title', t.image_url as 'thread_image', t.thread_id, t.body, t.created_at, u.first_name, u.last_name, u.user_id, f.title as 'forum_title', f.forum_id, f.image_url as 'forum_image' FROM threads t INNER JOIN users u ON u.user_id = t.user_id INNER JOIN forums f ON t.forum_id = f.forum_id AND f.forum_id = ?";

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
