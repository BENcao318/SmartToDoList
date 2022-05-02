const express = require('express');
const router = express.Router();
const { categorizing,  } = require('./api/apiCalls');
const { processDuckDuckGoSearchResult } = require('./api/keywords');


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
    let task = req.body.name;
    // res.send("😊");
    // categorizing(task);
    categorizing(task)
      .then(result => {
        const categoryId = processDuckDuckGoSearchResult(JSON.parse(result));
        // console.log('id----------------------:', categoryId);
        const response = { ...req.body, category_id: categoryId};
        return response;
      }).then((task) => {
        database.query(database.addTask(task).queryString)
          .then((task) => {
            if(!task) {
              res.send({ error: "error" });
              return;
            }
            res.send(task[0]);
          })
          .catch((err) => res.send(err));
      })
  });

  //Delete a task
  router.post('/delete', (req, res) => {
    database.query(database.deleteTask(req.body.taskId).queryString)
      .then(result => res.send({ result }))
      .catch((error) => {
        console.log(err);
        res.send(err);
      })
    });


  //Edit / Update a task
  router.post('/update', (req, res) => {
    const { taskName, category, id, date } = req.body;
    database.query(database.updateTask(id, taskName, category, date).queryString)
      .then(result => res.send({ result }))
      .catch((error) => {
        console.log(err);
        res.send(err);
      })
  })

  //GET task details
  router.post('/details', (req, res) => {
    
  })
  

  return router;
}