const API_KEYS = [
  "e83e808f55ce4c62a8afe1c33d13d28b",
  "8126ae9100ff429ebec68fbf3fc4cd4d",
  "3065a421504844f18f7091cafe9c42c7",
];

const MAX_RETRIES = 3;
let retries = 0;

function switchApiKey() {
  let currentApiKeyIndex = API_KEYS.indexOf(API_KEY);
  API_KEY = API_KEYS[(currentApiKeyIndex + 1) % API_KEYS.length];
}

let API_KEY = "3065a421504844f18f7091cafe9c42c7";

function removeDuplicates(articles) {
    const seen = new Set();
  
    return articles
      .filter((item) => {
        // Filter out articles with invalid fields like '[Removed]' or null
        return (
          item.title && 
          item.url &&
          item.description &&
          item.urlToImage && 
          item.title !== "[Removed]" &&
          item.description !== "[Removed]" &&
          item.urlToImage !== "[Removed]"
        );
      })
      .filter((item) => {
        // Combine title and URL to ensure uniqueness
        const key = item.title + item.url;
        if (seen.has(key)) {
          return false;
        }
        seen.add(key);
        return true;
      });
  }
  

export const fetchNewsData = async (page) => {
  const url = `https://newsapi.org/v2/top-headlines?category=general&language=en&pageSize=25&page=${page}&apiKey=${API_KEY}&sortBy=publishedAt`;
  const response = await fetch(url);

  if (response.status === 429 && retries < MAX_RETRIES) {
    switchApiKey();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    retries++;
    return fetchNewsData(page);
  }

  const data = await response.json();
  retries = 0; // Reset retries after successful fetch

  // Apply filters
  const filteredData = data.articles.filter((item) => item.urlToImage);
  return removeDuplicates(filteredData);
};

export const fetchCategoriesNews = async (page, category) => {
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=25&page=${page}&apiKey=${API_KEY}&sortBy=publishedAt`;
  const response = await fetch(url);

  if (response.status === 429 && retries < MAX_RETRIES) {
    switchApiKey();
    await new Promise((resolve) => setTimeout(resolve, 1000)); 
    retries++;
    return fetchCategoriesNews(page, category);
  }

  const CatData = await response.json();
  retries = 0; // Reset retries after successful fetch

  // Apply filters
  const filteredData = CatData.articles.filter((item) => item.urlToImage);
  return removeDuplicates(filteredData);
};

export const searchNews = async (searchTerm, page) => {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  const url = `https://newsapi.org/v2/everything?q=${encodedSearchTerm}&language=en&apiKey=${API_KEY}&pageSize=20&page=${page}&sortBy=publishedAt`;
  const response = await fetch(url);

  if (response.status === 429 && retries < MAX_RETRIES) {
    switchApiKey();
    await new Promise((resolve) => setTimeout(resolve, 1000)); 
    retries++;
    return searchNews(searchTerm);
  }

  const searchData = await response.json();
  retries = 0; // Reset retries after successful fetch

  // Remove duplicates based on both title and URL
  const uniqueArticles = removeDuplicates(searchData.articles);
  return uniqueArticles;
};
