CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT NOW(),
  image_url TEXT NULL,
  bio TEXT NULL,
  role CHAR(4) NOT NULL DEFAULT 'User',
  PRIMARY KEY (user_id),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) 
  VISIBLE
);