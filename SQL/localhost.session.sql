SELECT 
  t.thread_id AS 'thread_id', 
  t.created_at,
  t.title AS 'thread_title', 
  t.body, 
  t.image_url AS 'thread_image', 
  f.title AS 'forum_title', 
  f.image_url AS 'forum_image', 
  f.forum_id AS 'forum_id',
  tu.first_name AS 'creator_fname',
  tu.last_name AS 'creator_lname'
FROM forums_followers ff
INNER JOIN users u 
  ON 
    ff.user_id = '3e520f9c-6dd8-4355-abba-fdc5b0de3091'
  AND
    u.user_id = ff.user_id
INNER JOIN forums f
  ON 
    f.forum_id = ff.forum_id
INNER JOIN threads t 
  ON 
    t.forum_id = f.forum_id
INNER JOIN users tu
  ON 
    tu.user_id = t.user_id
ORDER BY t.created_at DESC;