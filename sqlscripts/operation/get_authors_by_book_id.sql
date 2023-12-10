SELECT authors.author_name
  FROM authors
  JOIN book_author ON authors.author_id = book_author.author_id
  WHERE book_author.book_id = ?;