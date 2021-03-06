const request = require('request-promise-native');
const yelp = require('yelp-fusion');
const axios = require('axios');

const yelpAPIkey = '1YYF0nzWDW5FhQA9nst65Py_3klJ7mCBqqM-1Kv2rQAnSnaaI9BD2e1PXz7B4Hs-1gw6GtSKUwRhhuLlFwOBx22iT6YMXHDDI_CDIrgb4kbfvCwv5uojtFol3YhoYnYx';
const client = yelp.client(yelpAPIkey);

function categorizing(task) {
  // console.log(task)
  let taskStringArr = task.split(' ');
  // console.log(taskStringArr[taskStringArr.length - 1]);
  return request(`https://api.duckduckgo.com/?q=${task}&format=json&pretty=1`)
}



//Yelp Search for Restaurants To Eat
function yelpAPISearch(keyword) {
  return client.search({
    term: keyword,
    location: 'toronto, on',
    limit: 3,
  }).then(response => {
    return response.jsonBody;
  }).catch(e => {
    console.log(e);
  });
  // client.businessMatch({
  //   name: 'Pannikin Coffee & Tea',
  //   address1: '510 N Coast Hwy 101',
  //   address2: 'Encinitas, CA 92024',
  //   city: 'Encinitas',
  //   state: 'CA',
  //   country: 'US'
  // }).then(response => {
  //   console.log(response.jsonBody.businesses);
  // }).catch(e => {
  //   console.log(e);
  // });
}

function googleBooksOptions() {
  let options = {
    key: "AIzaSyB6pu5cakD3JGz7d2-qCSfrNL6yttwg0Dg",
    field: 'title',
    offset: 0,
    limit: 10,
    type: 'books',
    order: 'relevance',
    lang: 'en'
  };

  return options;
}

function escapeSingleQuote(string) {
  let newStr = '';

  for(let i = 0; i < string.length; i++) {
    if(string[i] === "'"){
      newStr += string[i] + "'"
    } else {
      newStr += string[i];
    }
  }
  return newStr;
}

function moviesAPISearch(keyword) {
  const options = {
    method: 'GET',
    url: 'https://online-movie-database.p.rapidapi.com/auto-complete',
    params: {q: keyword, limit: '6'},
    headers: {
      'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
      'X-RapidAPI-Key': 'f78ecbace5mshf59f58fb4f4000ap14ea9fjsndb925fd9be2b'
    }
  };

  return axios.request(options);
}

moviesAPISearch('the batman');

function productsAPISearch(keyword) {
  const options = {
    method: 'GET',
    url: 'https://amazon24.p.rapidapi.com/api/product',
    params: { categoryID: 'aps', keyword: keyword, country: "CA", page: "1" },
    headers: {
      'X-RapidAPI-Host': 'amazon24.p.rapidapi.com',
      'X-RapidAPI-Key': '44d0c42b33msh107addb11e0a10bp1b6bdejsn84e350f1cc2e'
    }
  };

  return axios.request(options);
}

productsAPISearch('iphone');


module.exports = {
  categorizing,
  escapeSingleQuote,
  yelpAPISearch,
  googleBooksOptions,
  moviesAPISearch,
  productsAPISearch,
}
