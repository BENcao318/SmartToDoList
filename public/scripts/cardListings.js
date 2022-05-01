$(() => {
  window.cardListings = {};

  function createCard(task) {
    return `
      <div class="card mt-2 mb-2 shadow bg-light" id="card-${task.id}">
        <div class="card-body wrap" id="task-${task.id}">
          <h4>${task.name}</h3>
          <p>Task ${task.id}</p>

          <a 
            href="#" 
            rel="popover"
            class="popover-details"
            id="content-${task.id}"
          ></a>

          <button         
            class="btn btn-primary btn-sm edit-btn"
            data-bs-toggle="modal"
            data-bs-target="#task"
          > Edit </button>
          
          <button
            class="btn btn-primary btn-sm delete" id="delete-${task.id}"
          > <i class="fa-solid fa-trash-can"></i>
          </button>

        </div>
      </div>

      <div class="d-none" id="popover-content-${task.id}">
        <div class="popover-heading">
          ${task.name}
        </div>

        <div class="popover-body">
          <p>
            ${task.name}
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
      addCardToList(card, task.category_id);
    })
  }

  window.cardListings.createCardList = createCardList;
  window.cardListings.createCard = createCard;
  window.cardListings.addCardToList = addCardToList;

})