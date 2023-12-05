SELECT author_id INTO @authorId FROM  authors WHERE author_name = 'textField1';
SELECT book_id INTO @bookId  FROM  books WHERE book_name = 'textField2';
INSERT INTO book_author (book_id, author_id) VALUES (@bookId, @authorId);

