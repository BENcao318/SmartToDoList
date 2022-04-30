const books = require('google-books-search');

// books.search('Harry Potter and Prisoner of Azkaban', function(error, response) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(response);
//     }
// });

let options = {
    key: "AIzaSyB6pu5cakD3JGz7d2-qCSfrNL6yttwg0Dg",
    field: 'title',
    offset: 0,
    limit: 10,
    type: 'books',
    order: 'relevance',
    lang: 'en'
};

books.search("Harry Potter and the Prisoner of Azkaban", options, function(error, response) {
    if (error) {
        console.log(error);
    } else {
        console.log(response);
    }
});

// const requestBookByTitle = (titleOrAuthor) => {
//   // return null
//   return request(`https://www.googleapis.com/books/v1/volumes?q=${titleOrAuthor}`)
//   .then(res => {
//     res = JSON.parse(res);
//     if (res.items.length) {
//       console.log('read:', res.items[0].volumeInfo.title);
//       return Math.max(
//         compareStrings(res.items[0].volumeInfo.title.toLowerCase(), titleOrAuthor.toLowerCase()),
//         compareStrings(res.items[0].volumeInfo.authors[0].toLowerCase(), titleOrAuthor.toLowerCase())
//       )
//     }
//     return 0;
//   });
// };

