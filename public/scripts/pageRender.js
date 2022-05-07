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
        const status = $(this).parent().parent().attr('status');

        getTaskDetails({ taskId, taskName, status })
          .then((result) => {
            console.log(result[0])
            const taskDetail = result[0];
            const taskDetailCategory = result[0].category;

            const $popoverContent = $(cardListings.createPopoverContent(taskDetail, taskDetailCategory)).html()

            $(this).parent().parent().attr('status', 'not changed');
            $('#' + tmpId).removeClass('loading spinner').append($popoverContent);
          })

        return $('<div>').attr('id', tmpId).addClass('loading spinner');
      }
    });

    //when add-task button is pressed, call the duckduckgo api in the backend to categorize the task and return the result
    $('#add-task').on('click', () => {
      if($('#new-task').val()) {
        let task = {}; 
        let date = $('#main-datepicker').val() ? $('#main-datepicker').val() : '2022-08-30';

        task = { name: $('#new-task').val().trim(), user_id: 1, start_date: date, is_completed: true, is_important: true }

        addTaskToDB(task)
          .then((response) => {

            if(response.category_id){
              tasks.push(response);
              let card = cardListings.createCard(response);

              cardListings.addCardToList(card, response.category_id);
              $('#new-task').val('');
              $('#main-datepicker').val('');
            }
          });
      }
    })
    //delete a task
    $('body').on('click', '.delete', (e) => {
      const taskId = $(e.currentTarget).attr('id').slice(7)
      deleteTask({ taskId })
        .then((res) => {
          console.log('deleted task:',  res);
          $(e.currentTarget).parent().parent().remove();
        })
    })
    //open edit window
    let prevTaskName = '';
    let prevTaskCategory = 0;
    let prevTaskDate = '';

    $('body').on('click', '.edit-btn', (e) => {
      const parentId = $(e.target.parentElement).attr('id');
      const taskId = Number(parentId.slice(5));
      const targetTask = tasks.find(task => task.id === taskId);
      const taskDate = targetTask.start_date;

      $('#task-name').val(targetTask.name);
      $('#categories-select-menu').val(targetTask.category_id);
      $('#edit-task-id').val(taskId);
      $('#datepicker').val(helper.convertDate(taskDate));

      prevTaskName = $('#task-name').val();
      prevTaskCategory = $('#categories-select-menu').val();
      prevTaskDate = $('#datepicker').val();
    })

    //submit edit form content 
    $('#edit-form').on('submit', (event) => {
      event.preventDefault();
      
      const data = $('#edit-form').serialize() + `&id=${$('#edit-task-id').val()}`;
      const cardId = `card-${$('#edit-task-id').val()}`;

      if(prevTaskName !== $('#task-name').val() || prevTaskCategory !== $('#categories-select-menu').val() || prevTaskDate !== $('#datepicker').val()) {
        editTask(data)
          .then(json => {
            const categoryIsChanged = prevTaskCategory !== $('#categories-select-menu').val() ? true : false;
            changeCard(cardId, json.result[0].category_id, json.result[0].name, categoryIsChanged, helper.convertDate(json.result[0].start_date));
            prevTaskName = $('#task-name').val();
            prevTaskCategory = $('#categories-select-menu').val();
            prevTaskDate = $('#datepicker').val();

            $(`#${cardId}`).attr('status', 'changed');  //change the status attribute from unchanged to changed for recalling the API to retrieve the data with new task name. 
            getTasksFromDB()
              .then((res) => {
                tasks = res.tasks;
            })

            $('.modal').modal('toggle');
          })
        } else {
          $('.modal').modal('toggle');
        }
    })


    
    $('.card').draggable({
      revert: 'true',
      helper: 'clone',
      opacity: '0.8',
      zIndex: 3,
    });

    $('.task-categories').droppable({
      drop: function(event, ui) {
        const cardId = 'card-' + $(ui.draggable).attr('id').slice(5);
        const card = $(`#${cardId}`)[0];
        const targetId = $(this).attr('id');
        
        //database interaction for updating the categories
        const data = {
          id: $(ui.draggable).attr('id').slice(5),/*task id for update  */
          category: $(this).attr('name'),/* task category for update */
          taskName: $(`#${cardId} h3`).text(),/* task name for update */
          date: $(`#${cardId} p`).text(),/* task name for update */
        }

        editTask(data)/* update task in database */

        $(`#${cardId}`).attr('status', 'changed');
        $(ui.draggable).remove();
        $(`#${targetId}`).append(card);

        getTasksFromDB()
          .then((res) => {
            tasks = res.tasks;
          })

        // add helper to the dragged item so that this item can be draggable again 
        $(`#${cardId}`).draggable({
          helper: 'clone',
        })

        $.ui.draggable.prototype.destroy = function (ul, item) { }; //empty the draggable.prototype.destroy function so that the item can be redraggable after being dragged
      }
    })

    $( ".datepicker" ).datepicker();

  }

  function changeCard(cardId, categoryId, cardName, categoryIsChanged, taskDate) {
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

    if(categoryIsChanged) {
      let copyCard = $(`#${cardId}`).clone();
      $(`#${cardId}`).remove();
      $(`#${kanbanId}`).append(copyCard);
    } else {
      console.log('changeCARD', taskDate)
      $(`#${cardId} h3`).text(cardName);
      $(`#${cardId} p`).text(taskDate);
    }
    //To do: only append the card when it changes category. Change the card name directly 
  }

  window.pageRender.render = render;
})

e);
      $(`#${cardId} p`).text(taskDate);
    }
    //To do: only append the card when it changes category. Change the card name directly 
  }

  window.pageRender.render = render;
})

