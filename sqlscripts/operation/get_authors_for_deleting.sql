select authors.author_id
FROM authors
LEFT JOIN book_author ON authors.author_id = book_author.author_id
WHERE book_author.author_id IS NULL;