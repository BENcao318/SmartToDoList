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
    //open edit window
    $('.edit-btn').on('click', (e) => {
      const parentId = $(e.target.parentElement).attr('id');
      const taskId = Number(parentId.slice(5));
      const targetTask = tasks.find(task => task.id === taskId);

      $('#task-name').val(targetTask.name);
      $('#categories-select-menu').val(targetTask.category_id);
      $('#edit-task-id').val(taskId);
    })
  
    $('#edit-form').on('submit', (event) => {
      event.preventDefault();
      // console.log('testtest');
      // console.log(event);
      // console.log($('#task-name').val());
      // console.log($('#categories-select-menu').val());
      
      const data = $('#edit-form').serialize() + `&id=${$('#edit-task-id').val()}`;
      const cardId = `card-${$('#edit-task-id').val()}`;


      editTask(data)
        .then(json => {
          changeCardCategory(cardId, json.result[0].category_id);
          $('.modal').modal('toggle');
        })
    })

    function changeCardCategory(cardId, categoryId) {
      let kanbanId = '';
      switch (categoryId) {
        case 1:
          kanbanId = "tasklist-to-eat";
          break;
        case 2:
          kanbanId = "tasklist-to-read";
          break;
        case 3:
          kanbanId = "tasklist-to-watch";
          break;
        case 4:
          kanbanId = "tasklist-to-buy";
          break;
      }

      //copy the card to edit and append it to target category kanban then remove the card from the original kanban
      let copyCard = $(`#${cardId}`).clone();
      $(`#${cardId}`).remove();
      $(`#${kanbanId}`).append(copyCard);

    }

    // $('.card').draggable({
    //   revert: 'true',
    //   helper: 'clone',
    //   opacity: '0.8',
    //   zIndex: 3,
    // });

  }

  window.pageRender.render = render;
})

