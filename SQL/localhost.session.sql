-- CREATE DATABASE internet_forum

-- CREATE TABLE Posts (
--   post_id VARCHAR(255) NOT NULL,
--   title VARCHAR(100),
--   body TEXT,
--   created_at DATE,
--   user_id VARCHAR(255),
--   PRIMARY KEY (post_id),
--   FOREIGN KEY (user_id) REFERENCES Users(user_id)
-- );

-- CREATE TABLE Users (
--   user_id VARCHAR(255) NOT NULL,
--   first_name VARCHAR(50),
--   last_name VARCHAR(50),
--   email VARCHAR(45),
--   created_at DATE,
--   PRIMARY KEY (user_id)
-- );