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
  
    // $('.card').draggable({
    //   revert: 'true',
    //   helper: 'clone',
    //   opacity: '0.8',
    //   zIndex: 3,
    // });

  }

  window.pageRender.render = render;
})