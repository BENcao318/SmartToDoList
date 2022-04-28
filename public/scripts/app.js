// Client facing scripts here
$(() => {

  const tasks = [
    {
      id: 1,
      title: "task 1",
      content: "This is task 1",
      category: 1,
    },
    {
      id: 2,
      title: "task 2",
      content: "This is task 2",
      category: 2,
    },
    {
      id: 3,
      title: "task 3",
      content: "This is task 3",
      category: 3,
    },
    {
      id: 4,
      title: "task 4",
      content: "This is task 4",
      category: 4,
    },
    {
      id: 5,
      title: "task 5",
      content: "This is task 5",
      category: 4,
    },
    {
      id: 6,
      title: "task 6",
      content: "This is task 6",
      category: 2,
    },
  ]

  window.tasks = tasks;

  // Render tasks to each category div
  cardListings.createCardList(tasks);

  // $("#tasklist-to-read").append($cardListings);


  $('.popover-details').popover({
    html: true,
    placement: "right",
    title: "Popover Title ",
    trigger: "click",
    // selector: '[rel="popover-test"]',
    content: function() {
      let $popoverContent = $(`#popover-${$(this)[0].id}`)
      return $(`#popover-${$(this)[0].id}`).html();
    },
  });

  // $('.card').draggable({
  //   revert: 'true',
  //   helper: 'clone',
  //   opacity: '0.8',
  //   zIndex: 3,
  // });

}) 