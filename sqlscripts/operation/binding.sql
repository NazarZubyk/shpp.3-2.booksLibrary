SELECT author_id INTO @authorId FROM  authors WHERE author_name = ?;
SELECT book_id INTO @bookId  FROM  books WHERE book_name = ?;
INSERT INTO book_author (book_id, author_id) VALUES (@bookId, @authorId);

