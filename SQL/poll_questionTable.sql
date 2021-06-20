CREATE TABLE `internet_forum`.`polls_questions` (
  `question_id` INT NOT NULL AUTO_INCREMENT,
  `poll_id` INT NOT NULL,
  `content` TEXT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `active` TINYINT NOT NULL,
  PRIMARY KEY (`question_id`),
  INDEX `fk_link_question_poll_idx` (`poll_id` ASC) VISIBLE,
  CONSTRAINT `fk_link_question_poll`
    FOREIGN KEY (`poll_id`)
    REFERENCES `internet_forum`.`polls` (`poll_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);