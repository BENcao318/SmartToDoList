SELECT movies.name
FROM movies
JOIN categories ON categories.id = movies.category_id
JOIN tasks ON tasks.category_id = categories.id
JOIN users ON tasks.user_id = users.id
WHERE users.id = 3;
