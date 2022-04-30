// Client facing scripts here
$(() => {

  getTasksFromDB()
    .then((res) => {
      let tasks = res.tasks;
      
      // let newTask = { ...tasks[0] };
      // delete newTask.id
      // console.log(newTask);
      // addTaskToDB(newTask);

      cardListings.createCardList(tasks);   // Render tasks to each category div

      pageRender.render();

      window.tasks = tasks;


    });
  


  // $("#tasklist-to-read").append($cardListings);

  // test()
  //   .then((json) => {
  //     console.log(json);
  //   })

  // addTask({
  //   id: 1,
  //   title: "task 1",
  //   content: "This is task 1",
  //   category: 1,
  // },)
  //   .then((res => {
  //     console.log(res)
  //   }))

}) 