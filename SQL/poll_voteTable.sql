CREATE TABLE `internet_forum`.`polls_votes` (
  `vote_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `question_id` INT NOT NULL,
  `answer_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`vote_id`),
  INDEX `fk_link_vote_question_idx` (`question_id` ASC) VISIBLE,
  INDEX `fk_link_vote_answer_idx` (`answer_id` ASC) VISIBLE,
  INDEX `fk_link_vote_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_link_vote_question`
    FOREIGN KEY (`question_id`)
    REFERENCES `internet_forum`.`polls_questions` (`question_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_link_vote_answer`
    FOREIGN KEY (`answer_id`)
    REFERENCES `internet_forum`.`polls_answers` (`answer_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_link_vote_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `internet_forum`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);