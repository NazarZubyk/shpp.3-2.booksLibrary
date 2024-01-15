SELECT book_id, book_name
FROM books
WHERE deleted = 0
ORDER BY views
LIMIT ? OFFSET ?;