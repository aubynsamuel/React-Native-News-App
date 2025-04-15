export interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  bookmarksList: NewsItem[];
  addToBookmarks: (item: NewsItem) => void;
  removeFromBookmarks: (item: NewsItem) => void;
}

export interface NewsItem {
  urlToImage: string;
  title: string;
  description: string;
  url: string;
  publishedAt?: string;
  source?: {
    name?: string;
  };
}
