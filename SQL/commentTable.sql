CREATE TABLE `internet_forum`.`comments` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `title` VARCHAR(100) NOT NULL,
  `body` TEXT NOT NULL,
  `user_id` INT NOT NULL,
  `thread_id` INT NOT NULL,
  PRIMARY KEY (`comment_id`),
  INDEX `fk_link_comment_user_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_link_comment_thread_idx` (`thread_id` ASC) VISIBLE,
  CONSTRAINT `fk_link_comment_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `internet_forum`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_link_comment_thread`
    FOREIGN KEY (`thread_id`)
    REFERENCES `internet_forum`.`threads` (`thread_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);