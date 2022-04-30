$(() => {
  $('.edit-btn').on('click', (e) => {
    const parentId = $(e.target.parentElement).attr('id');
    const taskId = parentId.slice(5);
    
    $('#task-name').val(tasks[taskId - 1].name);
    $('#categories-select-menu').val(tasks[taskId - 1].category_id);
  })

  $('#edit-form').on('submit', (event) => {
    event.preventDefault();
    // console.log('testtest');
    // console.log(event);
    // console.log($('#task-name').val());
    // console.log($('#categories-select-menu').val());
    console.log($('#edit-form').serialize());
  })
})
