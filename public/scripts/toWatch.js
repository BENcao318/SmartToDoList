const axios = require("axios");

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

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

console.log(moviesAPISearch('the batman'));


// example result
{
  d: [
    {
      i: [Object],
      id: 'tt1877830',
      l: 'The Batman',
      q: 'feature',
      rank: 1,
      s: 'Robert Pattinson, Zoë Kravitz',
      v: [Array],
      vt: 31,
      y: 2022
    },
    {
      i: [Object],
      id: 'tt19064880',
      l: 'The Batman: Deleted Arkham Scene',
      q: 'video',
      rank: 226,
      s: 'Barry Keoghan, Robert Pattinson',
      y: 2022
    }
  ]
}
