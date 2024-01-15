ALTER TABLE books
MODIFY book_name VARCHAR(255) NOT NULL,
ADD UNIQUE INDEX idx_book_name_unique (book_name);