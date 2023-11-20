CREATE TABLE IF NOT EXISTS book_author (
  id INT PRIMARY KEY AUTO_INCREMENT,
  book_id INT,
  author_id INT,
  FOREIGN KEY (book_id) REFERENCES books(book_id),
  FOREIGN KEY (author_id) REFERENCES authors(author_id)
);