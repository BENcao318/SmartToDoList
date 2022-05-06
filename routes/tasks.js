const express = require('express');
const router = express.Router();
const { categorizing, yelpAPISearch, googleBooksOptions, escapeSingleQuote, moviesAPISearch,  } = require('./api/apiCalls');
const { processDuckDuckGoSearchResult } = require('./api/keywords');

const googleBooksAPISearch = require('google-books-search');

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
    const task = req.body.name;

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
    console.log('request----------', date )
    database.query(database.updateTask(id, taskName, category, date).queryString)
      .then(result => res.send({ result }))
      .catch((error) => {
        console.log(err);
        res.send(err);
      })
  })

  //GET task details
  router.get('/details/:taskId/:taskName/:status', (req, res) => {
    const taskId = req.params.taskId;
    const taskName = req.params.taskName;
    const status = req.params.status;
    // console.log('nameStatus:===', taskName);
    database.query(database.getCategoryId(taskId).queryString)
      .then((result) => {
        const categoryId = result[0].category_id;

        database.query(database.getCategoryName(categoryId).queryString)
          .then((result) => {
            const categoryName = result[0].name;

            database.query(database.getTaskDetails(taskId, categoryName).queryString)
              .then((result) => {
                if(result.length === 0 || status === "changed") { //if the task does not exist in database or if the task name is changed, run api
                  console.log('using api')
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
                  } else if(categoryId === 2) {
                    googleBooksAPISearch.search(taskName, googleBooksOptions(), function(error, response) {
                      if (error) {
                          console.log(error);
                      } else {
                          const apiResult = response[0];

                          const bookInfo = {
                            category_id: categoryId,
                            task_id: parseInt(taskId),
                            rating: apiResult.averageRating ? apiResult.averageRating : 0,
                            name: apiResult.title,
                            year_created: 2019,
                            description: escapeSingleQuote(apiResult.description),
                            img: apiResult.thumbnail,
                            author: Array.isArray(apiResult.authors) ? apiResult.authors.join(', ') : apiResult.authors,
                          }

                          database.query(database.addBookDetails(bookInfo).queryString)
                            .then((result) => {
                              result[0]['category'] = categoryName;
                              console.log(result[0])
                              res.send(result);
                            })
                        }
                      });  
                  } else if(categoryId === 3) {
                    moviesAPISearch(taskName)
                      .then((result) => {
                        const apiResult = result.data.d[0];
                        
                        const movieInfo = {
                          category_id: categoryId,
                          task_id: parseInt(taskId),
                          rank: apiResult.rank,
                          name: apiResult.l,
                          year_created: apiResult.y,
                          actors: apiResult.s,
                          img: apiResult.i.imageUrl,
                        }

                        database.query(database.addMovieDetails(movieInfo).queryString)
                          .then((result) => {
                            result[0]['category'] = categoryName;
                            console.log(result[0])
                            res.send(result);
                          })
                      })
                      .catch((err) => {
                        console.log(err);
                      })
                  } 

                } else {
                  console.log('got data from database');
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