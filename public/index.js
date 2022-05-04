// movies API testing
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://online-movie-database.p.rapidapi.com/auto-complete?q=game%20of%20thrones",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
		"X-RapidAPI-Key": "f78ecbace5mshf59f58fb4f4000ap14ea9fjsndb925fd9be2b"
	}
};

$.ajax(settings).done(function (response) {
	// console.log(response);
});
$.ajax(settings).done(function (data) {
  const list = data.d;
  list.map((item) => {
    // console.log(item)
    const movieName = item.l;
    // console.log("movie name:", movieName)
  })
  // console.log(item)
  // console.log(data);
  // const image = data.i.imageUrl;
  // console.log(image)
  // console.log()
})

