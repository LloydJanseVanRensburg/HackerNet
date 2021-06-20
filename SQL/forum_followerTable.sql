CREATE TABLE `internet_forum`.`forums_followers` (
  `forum_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`forum_id`, `user_id`));
