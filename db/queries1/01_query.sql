SELECT is_completed, is_important, users.id as user_id
FROM tasks
JOIN users ON users.id = user_id;
