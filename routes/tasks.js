const express = require('express');
const router = express.Router();
const { categorizing, yelpAPISearch,  } = require('./api/apiCalls');
const { processDuckDuckGoSearchResult } = require('./api/keywords');
const { getCategoryName, addRestaurantDetails } = require('./database');


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
        return { ...req.body, category_id: categoryId};
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
  router.get('/details/:taskId/:taskName', (req, res) => {
    // console.log('request:------', req.params);
    const taskId = req.params.taskId;
    const taskName = req.params.taskName;

    database.query(database.getCategoryId(taskId).queryString)
      .then((result) => {
        const categoryId = result[0].category_id;

        database.query(database.getCategoryName(categoryId).queryString)
          .then((result) => {
            const categoryName = result[0].name;

            database.query(database.getTaskDetails(taskId, categoryName).queryString)
              .then((result) => {
                if(result.length === 0) {
                  if(categoryId === 1){
                    yelpAPISearch(taskName)
                      .then((result) => {
                        const apiResult = result.businesses[0];

                        const restaurantInfo = {
                          category_id: categoryId,
                          task_id: parseInt(taskId),
                          rating: Number(apiResult.rating),
                          name: taskName,
                          location: `${apiResult.location.address1}, ${apiResult.location.city}`,
                          description: 'desc',
                          img: apiResult.image_url
                        }
                        database.query(database.addRestaurantDetails(restaurantInfo).queryString)
                          .then((result) => {
                            result[0]['category'] = categoryName;
                            console.log(result[0])
                            res.send(result);
                          })
                      })

                  }
                } else {
                  result[0]['category'] = categoryName;
                  res.send(result);
                }
              })
          })
      })
    // const apiSearchResult = ;
    // console.log(apiSearchResult)
    // res.send(apiSearchResult);
  })
  

  return router;
}