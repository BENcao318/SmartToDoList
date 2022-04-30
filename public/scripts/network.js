function test() {
  console.log('test get');
  return $.ajax({
    url: "/test"
  })
}

function getTasksFromDB(params) {
  let url = "/api/tasks";
  if(params) {
    url += "?" + params;
  }
  return $.ajax({
    url,
  })
}

function addTaskToDB(data) {
  return $.ajax({
    method: "POST",
    url: "/api/tasks",
    data,
  })
}

function deleteTask(data) {
  return $.ajax({
    method: "POST",
    url: "/api/tasks/delete",
    data,

  })
}

function editTask(data) {
  return $.ajax({
    method: "POST",
    url: "/api/tasks/update",
    data,
  })
}

function getTaskDetails(data) {
  return $.ajax({
    url: "/api/tasks/details",
  })
}