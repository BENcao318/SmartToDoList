$(() => {
  window.pageRender = {};

  function render() {
    //popover trigger
    $('body').popover({
      html: true,
      placement: "right",
      title: "Popover Title ",
      trigger: "click",
      selector: '[rel="popover"]',
      content: function() {
        return $(`#popover-${$(this)[0].id}`).html();
      },
    });
    //when add-task button is pressed, call the duckduckgo api in the backend to categorize the task and return the result
    $('#add-task').on('click', () => {
      if($('#new-task').val()) {
        let task = {}; 
        task.name = $('#new-task').val().trim();
        task = { ...task, user_id: 1, start_date: '2022-08-30', is_completed: true, is_important: true }
        addTaskToDB(task)
          .then((response) => {
            // console.log('response', response)
            if(response.category_id){
              tasks.push(response);
              let card = cardListings.createCard(response);
              cardListings.addCardToList(card, response.category_id);
              $('#new-task').val('');
            }
          });
      }
    })
    //delete a task
    $('.delete').on('click', (e) => {
      const taskId = $(e.currentTarget).attr('id').slice(7)
      console.log()
      deleteTask({ taskId })
        .then((res) => {
          console.log('deleted task:',  res.result[0]);
          $(e.currentTarget).parent().parent().remove();
        })
    })
  
    // $('.card').draggable({
    //   revert: 'true',
    //   helper: 'clone',
    //   opacity: '0.8',
    //   zIndex: 3,
    // });

  }

  window.pageRender.render = render;
})