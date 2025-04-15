import { removeDuplicates } from "@/services/utils";
import { API_KEYS } from "../apiKeys";
import { NewsItem } from "@/types/types";

const MAX_RETRIES = 3;
let retries = 0;

function switchApiKey() {
  const currentApiKeyIndex = API_KEYS.indexOf(API_KEY);
  API_KEY = API_KEYS[(currentApiKeyIndex + 1) % API_KEYS.length];
}

let API_KEY = API_KEYS[1];

export const fetchNewsData = async (page: number) => {
  const url = `https://newsapi.org/v2/top-headlines?category=general&language=en&pageSize=25&page=${page}&apiKey=${API_KEY}&sortBy=publishedAt`;
  const response = await fetch(url);

  if (response.status === 429 && retries < MAX_RETRIES) {
    switchApiKey();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    retries++;
    fetchNewsData(page);
  }

  const data = await response.json();
  retries = 0; // Reset retries after successful fetch

  // Apply filters
  const filteredData: NewsItem[] = data.articles.filter(
    (item: NewsItem) => item.urlToImage
  );
  return removeDuplicates(filteredData);
};

export const fetchCategoriesNews = async (page: number, category: string) => {
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=25&page=${page}&apiKey=${API_KEY}&sortBy=publishedAt`;
  const response = await fetch(url);

  if (response.status === 429 && retries < MAX_RETRIES) {
    switchApiKey();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    retries++;
    fetchCategoriesNews(page, category);
  }

  const CatData = await response.json();
  retries = 0; // Reset retries after successful fetch

  // Apply filters
  const filteredData: NewsItem[] = CatData.articles.filter(
    (item: NewsItem) => item.urlToImage
  );
  return removeDuplicates(filteredData);
};

export const searchNews = async (searchTerm: string, page?: number) => {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  const url = `https://newsapi.org/v2/everything?q=${encodedSearchTerm}&language=en&apiKey=${API_KEY}&pageSize=20&page=${page}&sortBy=publishedAt`;
  const response = await fetch(url);

  if (response.status === 429 && retries < MAX_RETRIES) {
    switchApiKey();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    retries++;
    searchNews(searchTerm);
  }

  const searchData: { articles: NewsItem[] } = await response.json();
  retries = 0; // Reset retries after successful fetch

  // Remove duplicates based on both title and URL
  const uniqueArticles = removeDuplicates(searchData.articles);
  return uniqueArticles;
};
