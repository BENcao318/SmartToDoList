$(() => {
  window.cardListings = {};

  function createCard(task) {
    return `
      <div class="card mt-2 mb-2 shadow bg-light">
        <div class="card-body wrap" id="task-${task.id}">
          <h3>${task.title}</h3>
          <p>${task.content}</p>

          <a 
            href="#" 
            rel="popover"
            class="popover-details"
            id="content-${task.id}"
          ></a>

          <a          
            class="btn btn-primary btn-sm edit-btn"
            data-bs-toggle="modal"
            data-bs-target="#task"
          > Edit </a>
          
          <a
            class="btn btn-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#task"
          > <i class="fa-solid fa-trash-can"></i>
          </a>

        </div>
      </div>

      <div class="d-none" id="popover-content-${task.id}">
        <div class="popover-heading">
          This is the heading for ${task.content}
        </div>

        <div class="popover-body">
          <p>
            This is the body for ${task.title}
          </p>
        </div>
    `
  }

  function addCardToList(card, taskCategory) {

    switch(taskCategory) {
      case 1: 
        $("#tasklist-to-eat").append(card);
        break;
      case 2: 
        $("#tasklist-to-read").append(card);
        break;
      case 3: 
        $("#tasklist-to-watch").append(card);
        break;
      case 4: 
        $("#tasklist-to-buy").append(card);
        break;
    }
  }

  function createCardList(tasks) {
    tasks.forEach((task) => {
      const card = createCard(task);
      addCardToList(card, task.category);
    })
  }

  window.cardListings.createCardList = createCardList;

})