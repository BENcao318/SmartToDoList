// PG database client/connection setup

const { Pool } = require("pg");
const dbParams = require("../lib/db");

const pool = new Pool(dbParams);

pool.connect();

// db.query(`SELECT * FROM users; `, (err, result) => {
//   if (err) {
//     return console.error('error executing query', err.stack)
//   }
//   console.log(result.rows)
// });

function getTasks(options) {
  const queryParams = [];

  let queryString = `
    SELECT * FROM tasks
  `;
  if(options.taskId) {
    queryParams.push(`${taskId}`)
    queryString += `
      WHERE id = $${queryParams.length}
    `;
  }

  return {
    queryString,
    queryParams,
  };
};

function addTask(task) {

  let queryString = `
    INSERT INTO tasks (id, user_id, name, start_date, is_completed, is_important, category_id)
    VALUES (DEFAULT, ${task.user_id}, '${task.name}', '${task.start_date}', ${task.is_completed}, ${task.is_important}, ${task.category_id})
    RETURNING *;
  `;

  return {
    queryString,
  }
}

function deleteTask(taskId) {
  let queryString = `
    DELETE FROM tasks WHERE id = ${taskId}
    RETURNING *;
  `;

  return {
    queryString,
  }
}

function updateTask(id, taskName, category, date) {
  let queryString = `
    UPDATE tasks
    SET name = '${taskName}', category_id = ${category}
    WHERE id = ${id}
    RETURNING category_id;
  `;

  console.log(queryString)

  return {
    queryString,
  }
}


// db.query(`SELECT tasks.name, users.id as user_id, users.name as user_name
// FROM tasks
// JOIN users on users.id = tasks.user_id
// WHERE users.id = 3; `, (err, result) => {
//   if (err) {
//     return console.error('error executing query', err.stack)
//   }
//   // console.log(result.rows[0])
// });

// db.query(`INSERT INTO tasks (id, user_id, name, start_date, is_completed, is_important, category_id)
// VALUES (DEFAULT, 3, 'Read Harry Potter', '2022-05-25', FALSE, TRUE, 1); `, (err, result) => {
//   if (err) {
//     return console.error('error executing query', err.stack)
//   }
//   console.log(result.rows[0]);
// });

// db.query(`SELECT rating, movies.name, year_created, description, img
// FROM movies
// LEFT OUTER JOIN tasks
// ON movies = tasks;`, (err, result) => {
//   if (err) {
//     return console.error('error executing query', err.stack)
//   }
//   console.log(result.rows[0]);
// });

// db.query(`DELETE FROM tasks WHERE id = 5;`, (err, result) => {
//   if (err) {
//     return console.error('error executing query', err.stack)
//   }
//   console.log(result.rows[0]);
// });

// db.query(`UPDATE tasks
// SET is_completed = TRUE
// WHERE id = 2;`, (err, result) => {
//   if (err) {
//     return console.error('error executing query', err.stack)
//   }
//   console.log(result.rows[0]);
// });


module.exports = {
  query: (queryString, queryParams) => {
    const start = Date.now();
    return pool
      .query(queryString, queryParams)
      .then(result => {
        const duration = Date.now() - start;
        console.log('executed query', { queryString, duration, rows: result.rowCount });
        return result.rows;
      })
      .catch(err => {
        console.log(err.message);
      })
  },
  getTasks,
  addTask,
  deleteTask,
  updateTask,
};



// testing queries

// getting all tasks from user_id -ok
// using task_id get category details (name, img, description...) -ok
// insert data into database - ok
// delete task_id(including all) from database
// update task
