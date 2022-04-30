const express = require('express');
const router = express.Router();

// "/api/tasks"
module.exports = function(database) {

  //GET request and send all tasks back
  router.get('/', (req, res) => {
    database.query(database.getTasks(req.query).queryString, database.getTasks(req.query).queryParams)
      .then((tasks) => res.send({ tasks }))
      .catch((err) => {
        console.error(err);
        res.send(err);
      })
  })

  //Add a task to the database
  router.post('/', (req, res) => {
    const task = req.body;
    console.log('---------------body', task)
    database.query(database.addTask(task).queryString)
      .then((task) => {
        if(!task) {
          res.send({ error: "error" });
          return;
        }
        res.send("😊");
      })
      .catch((err) => res.send(err));
  });

  //Delete a task
  router.post('/delete', (req, res) => {

  })

  //Edit / Update a task
  router.post('/update', (req, res) => {

  })

  //GET task details
  router.post('/details', (req, res) => {
    
  })
  

  return router;
}