// PG database client/connection setup

const { Pool } = require("pg");
const dbParams = require("../lib/db");

const pool = new Pool(dbParams);

pool.connect();

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

  return {
    queryString,
  }
}

function getCategoryId(taskId) {
    let queryString = `
      SELECT category_id FROM tasks
      WHERE id = ${taskId};
    `;

  return {
    queryString,
  }
}

function getCategoryName(categoryId) {
  let queryString = `
    SELECT name FROM categories
    WHERE id = ${categoryId};
  `;

  return {
    queryString,
  }
}

function getTaskDetails(taskId, categoryName) {
  let queryString = `
    SELECT * FROM ${categoryName}
    WHERE task_id = ${taskId};
  `;

  console.log(queryString);

  return {
    queryString,
  }
}

function addRestaurantDetails(params) {
  let queryString = `
    INSERT INTO restaurants (id, category_id, task_id, rating, name, location, description, img)
    VALUES (DEFAULT, ${params.category_id}, ${params.task_id}, ${params.rating}, '${params.name}', '${params.location}', '${params.description}', '${params.img}')
    RETURNING *;
  `;

  console.log(queryString)

  return {
    queryString,
  }
}

function addBookDetails(params) {
  let queryString = `
    INSERT INTO books (id, category_id, task_id, rating, name, author, description, img, year_created)
    VALUES (DEFAULT, ${params.category_id}, ${params.task_id}, ${params.rating}, '${params.name}', '${params.author}', '${params.description}', '${params.img}', ${params.year_created})
    RETURNING *;
  `;

  console.log(queryString)

  return {
    queryString,
  }
}

function addMovieDetails(params) {
  let queryString = `
    INSERT INTO movies (id, category_id, task_id, rank, name, year_created, actors, img)
    VALUES (DEFAULT, ${params.category_id}, ${params.task_id}, ${params.rank}, '${params.name}', ${params.year_created}, '${params.actors}', '${params.img}')
    RETURNING *;
  `;

  console.log(queryString)

  return {
    queryString,
  }
}

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
  getCategoryId,
  getCategoryName,
  getTaskDetails,
  addRestaurantDetails,
  addBookDetails,
  addMovieDetails,
};



// testing queries

// getting all tasks from user_id -ok
// using task_id get category details (name, img, description...) -ok
// insert data into database - ok
// delete task_id(including all) from database
// update task
