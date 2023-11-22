CREATE TABLE IF NOT EXISTS books (
  book_id INT PRIMARY KEY AUTO_INCREMENT,
  book_name VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  publication_date DATE NOT NULL,
  description VARCHAR(255)
);