const request = require('request-promise-native');

function categorizing(task) {
  // console.log(task)
  let taskStringArr = task.split(' ');
  // console.log(taskStringArr[taskStringArr.length - 1]);
  return request(`https://api.duckduckgo.com/?q=${task}&format=json&pretty=1`, (err, response, body) => {
    if(err) {
      console.log('err');
      return;
    }
    // console.log(JSON.parse(body))
    return body;
  })
}

module.exports = {
  categorizing,
}