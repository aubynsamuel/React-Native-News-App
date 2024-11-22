import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewsItem } from './components/BookmarksNewsCard';

export interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  bookmarksList: NewsItem[];
  addToBookmarks: (item: NewsItem) => void;
  removeFromBookmarks: (item: NewsItem) => void;
  storage: boolean;
  toggleStorage: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useTheme = () => useContext(AppContext);

export const AppContextProvider = ({children}:{children:React.ReactNode}) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  const [storage, setStorageState] = useState(false);
  const toggleStorage = () => {
    setStorageState(storage => !storage);
  };

  const [bookmarksList, setBookmarksList] = useState<NewsItem[]>([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem('bookmarksList');
        if (storedBookmarks) {
          setBookmarksList(JSON.parse(storedBookmarks));
        }
      } catch (error) {
      }
    };

    loadBookmarks();
  }, []);

  useEffect(() => {
    const saveBookmarks = async () => {
      try {
        await AsyncStorage.setItem(
          'bookmarksList',
          JSON.stringify(bookmarksList),
        );
      } catch (error) {
      }
    };

    saveBookmarks();
  }, [bookmarksList]);

  const addToBookmarks = (item : NewsItem) => {
    if (!bookmarksList.includes(item)) {
    setBookmarksList(prevList => [...prevList, item]);
    }
  };

  const removeFromBookmarks = (item: NewsItem) => {
    if (bookmarksList.includes(item)) {
      setBookmarksList(prevList =>
        prevList.filter(bookmark => bookmark !== item),
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        bookmarksList,
        addToBookmarks,
        removeFromBookmarks,
        storage,
        toggleStorage,
      }}>
      {children}
    </AppContext.Provider>
  );
};
