SELECT book_id, book_name
FROM books
WHERE LOWER(book_name) LIKE LOWER(?)
ORDER BY book_id  
LIMIT ? OFFSET ?;