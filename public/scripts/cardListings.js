$(() => {
  const $cardListings = $(`
    <div></div>
  `);
  window.cardListings = {};

  function createCard(card) {
    return `
      <div class="bg-light">
        <div class="card mt-2 mb-2 shadow">
          <div class="card-body wrap">
            <h3>${card.title}</h3>
            <p>${card.content}</p>
            <a 
              href="#" 
              data-bs-toggle="popover" 
              data-bs-trigger="focus"
              data-popover-content="#popover-content"
            ></a>

          </div>
        </div>
      </div>

      <div class="d-none" id="popover-content">
        <div class="popover-heading">
          This is the heading for ${card.content}
        </div>

        <div class="popover-body">
          <p>
            This is the body for ${card.title}
          </p>
          <button
            class="btn btn-primary btn-sm btn-task"
            data-bs-toggle="modal"
            data-bs-target="#task"
          >
          Edit
          </button>
        </div>
        </div>

      </div>
    `
  }

  function addCardToList(card) {
    $cardListings.append(card);
  }

  function createCardList(cards) {
    cards.forEach((card) => {
      const taskCard = createCard(card);
      addCardToList(taskCard);
    })
  }

  window.$cardListings = $cardListings;
  window.cardListings.createCardList = createCardList;

})
