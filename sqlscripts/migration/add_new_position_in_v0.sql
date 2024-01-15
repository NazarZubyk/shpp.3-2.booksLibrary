INSERT IGNORE INTO books (book_id, book_name, image_url, publication_date, description, clicks, views, deleted)
VALUES (?, ?, ?, ?, ?, ?, ?, ?);