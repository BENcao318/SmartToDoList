$(() => {
  window.pageRender = {};
  

  function render() {
    //popover trigger
    $('body').popover({
      'html': true,
      'placement': "right",
      'title': "Details",
      'trigger': "click",
      'selector': '[rel="popover"]',
      'content': function() {
        const taskId = $(this)[0].id.slice(8);
        const taskName = ($(this).parent().attr('name'));
        let tmpId = 'tmp-id-' + $.now();

        getTaskDetails({ taskId, taskName })
          .then((result) => {
            const taskDetail = result[0];
            const taskDetailCategory = result[0].category;
            console.log(taskDetail);
            const $popoverContent = $(`      
              <div class="popover-body" id="popover-content">
                <div>
                  <img src=${taskDetail.img} alt="images" width="200" height="200">
                </div>

                <div>
                  ${taskDetail.location}
                </div>

                <div>
                  Rating: ${taskDetail.rating} / 5
                </div>
            `).html()

            $('#' + tmpId).append($popoverContent);
          })
        return $('<div>').attr('id', tmpId);
      }
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
    let prevTaskName = '';
    let prevTaskCategory = 0;
    let prevTaskDate = '';

    $('.edit-btn').on('click', (e) => {
      const parentId = $(e.target.parentElement).attr('id');
      const taskId = Number(parentId.slice(5));
      const targetTask = tasks.find(task => task.id === taskId);

      $('#task-name').val(targetTask.name);
      $('#categories-select-menu').val(targetTask.category_id);
      $('#edit-task-id').val(taskId);

      prevTaskName = $('#task-name').val();
      prevTaskCategory = $('#categories-select-menu').val();

    })
  


    $('#edit-form').on('submit', (event) => {
      event.preventDefault();
      
      const data = $('#edit-form').serialize() + `&id=${$('#edit-task-id').val()}`;
      const cardId = `card-${$('#edit-task-id').val()}`;

      if(prevTaskCategory === $('#task-name').val() || prevTaskCategory === $('#categories-select-menu').val()) {
        $('.modal').modal('toggle');
      } else {
        editTask(data)
          .then(json => {
            changeCardCategory(cardId, json.result[0].category_id);
            prevTaskName = $('#task-name').val();
            prevTaskCategory = $('#categories-select-menu').val();
            $('.modal').modal('toggle');
          })
      }
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
    
    $('.card').draggable({
      revert: 'true',
      helper: 'clone',
      opacity: '0.8',
      zIndex: 3,
    });

    $('.task-categories').droppable({
      drop: function(event, ui) {
        const id = 'card-' + $(ui.draggable).attr('id').slice(5);
        const card = $(`#${id}`)[0];
        const target = $(this).attr('id');

        // add database interaction here
        $(ui.draggable).remove();
        $(`#${target}`).append(card);
        // add helper to the dragged item so that this item can be draggable again 
        $(`#${id}`).draggable({
          helper: 'clone',
        })

        $.ui.draggable.prototype.destroy = function (ul, item) { }; //empty the draggable.prototype.destroy function so that the item can be redraggable after being dragged
      }
    })

  }

  window.pageRender.render = render;
})

