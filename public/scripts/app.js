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