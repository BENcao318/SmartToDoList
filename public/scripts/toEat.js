const yelp = require('yelp-fusion');
const client = yelp.client('1YYF0nzWDW5FhQA9nst65Py_3klJ7mCBqqM-1Kv2rQAnSnaaI9BD2e1PXz7B4Hs-1gw6GtSKUwRhhuLlFwOBx22iT6YMXHDDI_CDIrgb4kbfvCwv5uojtFol3YhoYnYx');

//Business Search

client.search({
  term: 'starbucks',
  location: 'toronto, on',
  limit: 3,
}).then(response => {
  console.log(response.jsonBody);
}).catch(e => {
  console.log(e);
});

//Phone Search

// client.phoneSearch({
//   phone: '+14157492060'
// }).then(response => {
//   console.log(response.jsonBody);
// }).catch(e => {
//   console.log(e);
// });

//Transaction Search

client.transactionSearch('delivery', {
  location: 'san diego'
}).then(response => {
  console.log(response.jsonBody.businesses[0].name);
}).catch(e => {
  console.log(e);
});

//Business Details

client.business('gary-danko-san-francisco').then(response => {
  console.log(response.jsonBody.name);
}).catch(e => {
  console.log(e);
});

//Business Match

client.businessMatch({
  name: 'Pannikin Coffee & Tea',
  address1: '510 N Coast Hwy 101',
  address2: 'Encinitas, CA 92024',
  city: 'Encinitas',
  state: 'CA',
  country: 'US'
}).then(response => {
  console.log(response.jsonBody.businesses[0].id);
}).catch(e => {
  console.log(e);
});


//Reviews

client.reviews('gary-danko-san-francisco').then(response => {
  console.log(response.jsonBody.reviews[0].text);
}).catch(e => {
  console.log(e);
});

//Autocomplete

// // client.autocomplete({
// //   text: 'pizza'
// // }).then(response => {
// //   console.log(response.jsonBody.terms[0].text);
// // }).catch(e => {
// //   console.log(e);
// // });

// client.search('Starbucks', function(error, results) {
//   if ( ! error ) {
//       console.log(results);
//   } else {
//       console.log(error);
//   }
// });
