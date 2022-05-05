## API's

- Film / Series (To watch) - IMDb 
- Restaurants, cafes, etc. (To eat) -  Yelp
- Books (To read) - Books (To read) - google books api
- Products (To buy) - Amazon, Walmart 


## API results

### Google Books Search
```
[
  {
    title: 'Harry Potter and the Prisoner of Azkaban',
    authors: [ 'J.K. Rowling' ],de
    publisher: 'Pottermore Publishing',
    publishedDate: '2015-12-08',
    description: "'Welcome to the Knight Bus, emergency transport for the stranded witch or wizard. Just stick out your wand hand, step on board and we can take you anywhere you want to go.' When the Knight Bus crashes through the darkness and screeches to a halt in front of him, it's the start of another far from ordinary year at Hogwarts for Harry Potter. Sirius Black, escaped mass-murderer and follower of Lord Voldemort, is on the run - and they say he is coming after Harry. In his first ever Divination class, Professor Trelawney sees an omen of death in Harry's tea leaves... But perhaps most terrifying of all are the Dementors patrolling the school grounds, with their soul-sucking kiss... Having now become classics of our time, the Harry Potter ebooks never fail to bring comfort and escapism to readers of all ages. With its message of hope, belonging and the enduring power of truth and love, the story of the Boy Who Lived continues to delight generations of new readers.",
    industryIdentifiers: [ [Object], [Object] ],
    pageCount: 435,
    printType: 'BOOK',
    categories: [ 'Fiction' ],
    averageRating: 4.5,
    ratingsCount: 2173,
    maturityRating: 'NOT_MATURE',
    language: 'en',
    id: 'wHlDzHnt6x0C',
    link: 'https://play.google.com/store/books/details?id=wHlDzHnt6x0C',
    thumbnail: 'http://books.google.com/books/content?id=wHlDzHnt6x0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    images: {}
  },
  ...
]
```

### Yelp Businesses Search
```
[
   {
	      id: 'N6t4pCiqKCHaoaP7qTKEbQ',
	      alias: 'starbucks-toronto-158',
	      name: 'Starbucks',
	      image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/M_5I6wNl_Uy3xPthftggxw/o.jpg',
	      is_closed: false,
	      url: 'https://www.yelp.com/biz/starbucks-toronto-158?adjust_creative=GO9MLUGP6RuhkcRmTtdJBQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=GO9MLUGP6RuhkcRmTtdJBQ',
	      review_count: 6,
	      categories: [Array],
	      rating: 3,
	      coordinates: [Object],
	      transactions: [],
	      price: '$',
	      location: [Object],
	      phone: '+14169254626',
	      display_phone: '+1 416-925-4626',
	      distance: 600.3679128658508
    },
    ...
]
```

### Movies Search using RapidAPI by Api Dojo
```
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
    ...
}
```


