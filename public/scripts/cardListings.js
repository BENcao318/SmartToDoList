$(() => {
  window.cardListings = {};
  window.helper = {};

  function createCard(task) {
    task = { ...task, start_date: convertDate(task.start_date) };
    return `
      <div class="card mt-2 mb-2 shadow bg-light" id="card-${task.id}" status="not changed">
        <div class="card-body wrap" id="task-${task.id}" name="${task.name}">
        
          <h3 id="popover-task-name">${task.name}</h3>
          <p>${task.start_date}</p>

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

  function createPopoverContent(taskDetail, taskDetailCategory) {
    let popoverContent = ``;

    switch(taskDetailCategory) {
      case 'restaurants':
          popoverContent = (`      
          <div class="popover-body" id="popover-content">
            <div>
              <h4>${taskDetail.name}</h4>
              <img src=${taskDetail.img} alt="images" width="200" height="200">
            </div>
      
            <div>
              ${taskDetail.location}
            </div>
      
            <div>
              Rating: ${taskDetail.rating} / 5
            </div>
            <br>
            Powered by <img src='../images/yelpLogo.png' alt="images" width="60" heigth="20">
        `)
      break;
      case 'books' :
        popoverContent = (`      
        <div class="popover-body" id="popover-content">
          <div>
            <h4>${taskDetail.name}</h4>
            <br>
            <img src=${taskDetail.img} alt="images" width="200" height="200">
          </div>
          <br>
          <div>
            Author: ${taskDetail.author}
          </div>
    
          <div>
            Rating: ${taskDetail.rating} / 5
          </div>
          <br>
          Powered by <img src='../images/googleBooksIcon.png' alt="images" width="60" heigth="20">
      `)
      break;
      case 'movies':
        popoverContent = (`      
        <div class="popover-body" id="popover-content">
          <div>
            <h4>${taskDetail.name}</h4>
            <img src=${taskDetail.img} alt="images" width="200" height="200">
          </div>
          <br>
          <div>
            Stars: ${taskDetail.actors}
          </div>
    
          <div>
            Year: ${taskDetail.year_created}
          </div>
          <div>
            Rank: ${taskDetail.rank}
          </div>
          <br>
          Powered by <img src='../images/apiDojoLogo.jpg' alt="images" width="30" heigth="30">
      `)
      break;
      case 'products' :
        popoverContent = (`
        <div class="popover-body" id="popover-content">
          <div>
            <h4>${taskDetail.name}</h4>
            <br>
            <img src=${taskDetail.img} alt="images" width="200" height="200">
          </div>
          <br>
          <div>
            Price: ${taskDetail.price}
          </div>

          <div>
            Rating: ${taskDetail.rating} / 5
          </div>
          <br>
          Powered by <img src='../images/googleBooksIcon.png' alt="images" width="60" heigth="20">
      `)
      break;
    }

    return popoverContent;
  }

  function createCardList(tasks) {
    tasks.forEach((task) => {
      const card = createCard(task);
      addCardToList(card, task.category_id);
    })
  }

  function convertDate(date) {
    const dateFrom = new Date(date);
    const formDate = dateFrom.getFullYear()
                    + "-" + ("0" + (dateFrom.getMonth()+1)).slice(-2)
                    + "-" + ("0" + dateFrom.getDate()).slice(-2);
                    
    return formDate;
  }
  
  window.cardListings.createPopoverContent = createPopoverContent;
  window.cardListings.createCardList = createCardList;
  window.cardListings.createCard = createCard;
  window.cardListings.addCardToList = addCardToList;

  window.helper.convertDate = convertDate;
})



