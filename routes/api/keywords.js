const restaurantKeywords = ['restaurant', 'franchising', 'foodservice', 'coffee shop'];
const bookKeywords = ['novel', 'book', 'fiction', 'literature'];
const filmKeywords = ['film', 'movie', 'television', 'sitcom', 'shows'];

function processDuckDuckGoSearchResult(result) {
  let keyword = '';
  let categoryId = 0;

  if(result["Infobox"]){
    result.Infobox.content.forEach((item) => {
      if(item.label === 'Industry') {
        keyword = item.value;
      }
    })
  } 
  
  if(keyword !== ''){
    categoryId = keywordSearching(keyword.toLowerCase());
  } else {
    keyword = result.RelatedTopics[0].Text;
    categoryId = keywordSearching(keyword.toLowerCase());
  }

  return categoryId;
}

function keywordSearching(keyword) {
  let categoryId = 4;
  if(restaurantKeywords.some((word) => keyword.includes(word))) {
    categoryId = 1;
  } else if (bookKeywords.some((word) => keyword.includes(word))) {
    categoryId = 2;
  } else if (filmKeywords.some((word) => keyword.includes(word))) {
    categoryId = 3;
  }
  // console.log('category id:', categoryId);
  return categoryId;
}

module.exports = {
  processDuckDuckGoSearchResult,
}