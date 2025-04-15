import { NewsItem } from "@/types/types";

export function removeDuplicates(articles: NewsItem[]) {
  const cleanedArticles = new Set();

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
      if (cleanedArticles.has(key)) {
        return false;
      }
      cleanedArticles.add(key);
      return true;
    });
}
