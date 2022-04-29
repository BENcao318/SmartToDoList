const { Pool } = require('pg');

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
});

// pool.query(`SELECT * FROM users; `, (err, result) => {
//   if (err) {
//     return console.error('error executing query', err.stack)
//   }
//   // console.log(result.rows[0])
// });

// pool.query(`SELECT tasks.name, users.id as user_id, users.name as user_name
// FROM tasks
// JOIN users on users.id = tasks.user_id
// WHERE users.id = 3; `, (err, result) => {
//   if (err) {
//     return console.error('error executing query', err.stack)
//   }
//   // console.log(result.rows[0])
// });

// pool.query(`INSERT INTO tasks (id, user_id, name, start_date, is_completed, is_important, category_id)
// VALUES (DEFAULT, 3, 'Read Harry Potter', '2022-05-25', FALSE, TRUE, 1); `, (err, result) => {
//   if (err) {
//     return console.error('error executing query', err.stack)
//   }
//   console.log(result.rows[0]);
// });

// pool.query(`SELECT rating, movies.name, year_created, description, img
// FROM movies
// LEFT OUTER JOIN tasks
// ON movies = tasks;`, (err, result) => {
//   if (err) {
//     return console.error('error executing query', err.stack)
//   }
//   console.log(result.rows[0]);
// });

// pool.query(`DELETE FROM tasks WHERE id = 5;`, (err, result) => {
//   if (err) {
//     return console.error('error executing query', err.stack)
//   }
//   console.log(result.rows[0]);
// });

pool.query(`UPDATE tasks
SET is_completed = TRUE
WHERE id = 2;`, (err, result) => {
  if (err) {
    return console.error('error executing query', err.stack)
  }
  console.log(result.rows[0]);
});

// testing queries

// getting all tasks from user_id -ok
// using task_id get category details (name, img, description...) -ok
// insert data into database - ok
// delete task_id(including all) from database ok
// update task ok
