CREATE TABLE IF NOT EXISTS books1    (
  book_id INT PRIMARY KEY AUTO_INCREMENT,
  book_name VARCHAR(255) NOT NULL UNIQUE,
  image_url VARCHAR(255) NOT NULL,
  publication_date VARCHAR(255) NOT NULL,
  description VARCHAR(8000),
  clicks INT DEFAULT 0,
  views INT DEFAULT 0,
  deleted INT DEFAULT 0,
  authors_names VARCHAR(255)
);