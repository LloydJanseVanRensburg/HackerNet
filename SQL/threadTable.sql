CREATE TABLE `internet_forum`.`threads` (
  `thread_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `forum_id` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `body` TEXT NOT NULL,
  `image_url` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`thread_id`),
  INDEX `fk_link_thread_forum_idx` (`forum_id` ASC) VISIBLE,
  INDEX `fk_link_thread_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_link_thread_forum`
    FOREIGN KEY (`forum_id`)
    REFERENCES `internet_forum`.`forums` (`forum_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_link_thread_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `internet_forum`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);