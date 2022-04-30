// Client facing scripts here
$(() => {

  getTasks()
    .then((res) => {
      let tasks = res.tasks;
      // tasks.forEach((task) => {
      //   console.log(task)
      // })
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