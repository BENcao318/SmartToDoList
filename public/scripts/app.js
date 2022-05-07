// Client facing scripts here
$(() => {

  getTasksFromDB()
    .then((res) => {
      let tasks = res.tasks;

      cardListings.createCardList(tasks);   // Render tasks to each category div

      pageRender.render();

      window.tasks = tasks;
    });

}) 