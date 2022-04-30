const express = require('express');
const router = express.Router();

// "/api/tasks"
module.exports = function(database) {

  //GET request and send all tasks back
  router.get('/', (req, res) => {
    console.log('querystring:--------------', database.getTasks(req.query).queryString)
    console.log('queryParams:--------------', req.query)
    database.query(database.getTasks(req.query).queryString, database.getTasks(req.query).queryParams)
      .then((tasks) => res.send({ tasks }))
      .catch((err) => {
        console.error(err);
        res.send(err);
      })
  })

  //Add a task to the database
  router.post('/', (req, res) => {
    let response2 = req.body;
    console.log('testbody-----------', response2);
    res.send(response2);
  })

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