$(() => {
  window.pageRender = {};

  function render() {
    $('.popover-details').popover({
      html: true,
      placement: "right",
      title: "Popover Title ",
      trigger: "click",
      // selector: '[rel="popover-test"]',
      content: function() {
        return $(`#popover-${$(this)[0].id}`).html();
      },
    });

    $('#add-task').on('click', (e) => {

      if($('#new-task').val()) {
        let task = {}; 
        task.name = $('#new-task').val().trim();
        task = { ...task, user_id: 1, start_date: '2022-08-30', is_completed: true, is_important: true }
        addTaskToDB(task)
          .then((response) => {
            if(!JSON.parse(response)["Infobox"]){
              console.log('no Infobox ')
            }
            console.log(JSON.parse(response)["RelatedTopics"]);
            // tasks.push(task);
            // let card = cardListings.createCard(task);
            // cardListings.addCardToList(card, task.category_id);
          });
      }

    })


  
    // $('.card').draggable({
    //   revert: 'true',
    //   helper: 'clone',
    //   opacity: '0.8',
    //   zIndex: 3,
    // });

  }

  function addTask(task) {
    console.log(task);
  }


  window.pageRender.render = render;
})