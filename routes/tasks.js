const express = require('express');
const router = express.Router();

// "/api/tasks"
module.exports = function(db) {
  //GET request and send all tasks back
  router.get('/', (req, res) => {
    let response = req.query;
    console.log(req.query);
    res.send(response);
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