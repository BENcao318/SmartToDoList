const axios = require("axios");

function productsAPISearch(keyword) {
  const options = {
    method: "GET",
    url: "https://amazon24.p.rapidapi.com/api/product",
    params: { categoryID: 'aps', keyword: keyword, country: "CA", page: "1" },
    headers: {
      "X-RapidAPI-Host": "amazon24.p.rapidapi.com",
      "X-RapidAPI-Key": "44d0c42b33msh107addb11e0a10bp1b6bdejsn84e350f1cc2e",
    },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

productsAPISearch("charger");

// example result
{
  docs: [
    {
      isBestSeller: false,
      product_title:
        "Apple Smart Battery Case with Wireless Charging (for iPhone 11 Pro Max) - White",
      product_main_image_url:
        "https://m.media-amazon.com/images/I/41XbH-sVWPL._AC_UL320_.jpg",
      app_sale_price: "179.00",
      app_sale_price_currency: "$",
      isPrime: true,
      product_detail_url: "https://www.amazon.ca/dp/B081SHT8CL",
      product_id: "B081SHT8CL",
      evaluate_rate: "4.5 out of 5 stars",
      original_price: null,
    },
    {
      isBestSeller: false,
      product_title:
        "Apple Silicone Case with MagSafe (for iPhone 13 Pro Max) - Pink Pomelo",
      product_main_image_url:
        "https://m.media-amazon.com/images/I/61looSG6MRL._AC_UL320_.jpg",
      app_sale_price: "69.99",
      app_sale_price_currency: "$",
      isPrime: true,
      product_detail_url: "https://www.amazon.ca/dp/B09G7GS1WY",
      product_id: "B09G7GS1WY",
      evaluate_rate: "4.5 out of 5 stars",
      original_price: null,
    },
  ];
}
