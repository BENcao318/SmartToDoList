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
  ]


  cardListings.createCardList(cards);

  $("#tasklist-to-read").append($cardListings);

  let contentId = null;

  $('.popover-details').on('click', (e) => {
    contentId = e.target.id;
    // console.log(`#popover-${contentId}`);
  }).popover({
    html: true,
    placement: "right",
    title: "Popover Title ",
    trigger: "focus",
    // selector: '[rel="popover-test"]',
    content: function() {
      return $(`#popover-${$(this)[0].id}`).html();
    },
  });


}) 