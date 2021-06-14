const db = require("../config/db");

class Feed {
  async getMyFeedData(userId) {
    // get all user connected forums
    let sql = "SELECT forum_id FROM forums_followers WHERE user_id = ?";

    const [resA, _a] = await db.execute(sql, [userId]);

    let threads = [];

    for (let i = 0; i < resA.length; i++) {
      let sql2 = `SELECT t.title as 'thread_title', t.image_url as 'thread_image', t.thread_id, t.body, t.created_at, u.first_name, u.last_name, u.user_id, f.title as 'forum_title', f.forum_id, f.image_url as 'forum_image' FROM threads t INNER JOIN users u ON u.user_id = t.user_id INNER JOIN forums f ON t.forum_id = f.forum_id AND f.forum_id = ? ORDER BY t.created_at`;

      const [resB, _b] = await db.execute(sql2, [resA[i].forum_id]);

      if (resB.length > 0) {
        resB.forEach((thread) => {
          threads.push(thread);
        });
      }
    }

    return threads;
  }
}

module.exports = Feed;
