// Client facing scripts here
$(() => {

  const cards = [
    {
      id: 1,
      title: "task 1",
      content: "This is task 1",
    },
    {
      id: 2,
      title: "task 2",
      content: "This is task 2",
    },
    {
      id: 3,
      title: "task 3",
      content: "This is task 3",
    },
    {
      id: 4,
      title: "task 4",
      content: "This is task 4",
    },
    {
      id: 5,
      title: "task 4",
      content: "This is task 4",
    },
  ]


  cardListings.createCardList(cards);

  $("#tasklist-to-read").append($cardListings);

  $('[data-bs-toggle="popover"]').popover({
    placement: "right",
    content: function() {
      let content = $(this).attr("data-popover-content");
      return $(content).children(".popover-body").html()
    },
    title: "Popover Title "
  });
}) 