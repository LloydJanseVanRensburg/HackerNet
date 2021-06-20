CREATE TABLE forums (
  forum_id INT NOT NULL AUTO_INCREMENT,
  description TEXT NOT NULL,
  title VARCHAR(100) NOT NULL,
  image_url TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (forum_id)
);