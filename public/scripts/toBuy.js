const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://amazon24.p.rapidapi.com/api/product',
  params: {keyword: 'iphone', country: 'CA', page: '1'},
  headers: {
    'X-RapidAPI-Host': 'amazon24.p.rapidapi.com',
    'X-RapidAPI-Key': '44d0c42b33msh107addb11e0a10bp1b6bdejsn84e350f1cc2e'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
