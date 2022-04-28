SELECT is_completed, is_important, users.id as user_id
FROM tasks
JOIN users ON users.id = user_id;

SELECT id FROM tasks FULL OUTER JOIN movies ON tasks = movies
;

SELECT rating, name, year_created, description, img
FROM movies
LEFT OUTER JOIN tasks
ON movies = tasks;
