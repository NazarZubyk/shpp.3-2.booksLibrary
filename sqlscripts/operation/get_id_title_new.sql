SELECT book_id, book_name
FROM books
WHERE deleted = 0
ORDER BY publication_date
LIMIT ? OFFSET ?;