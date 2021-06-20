CREATE TABLE `internet_forum`.`polls` (
  `poll_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `forum_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `title` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`poll_id`),
  INDEX `fk_link_poll_user_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_link_poll_forum_idx` (`forum_id` ASC) VISIBLE,
  CONSTRAINT `fk_link_poll_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `internet_forum`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_link_poll_forum`
    FOREIGN KEY (`forum_id`)
    REFERENCES `internet_forum`.`forums` (`forum_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
