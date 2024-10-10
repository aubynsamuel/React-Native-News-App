import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a Context for global states
const AppContext = createContext();

// Custom hook to use the AppContext
export const useTheme = () => useContext(AppContext);

// Create a provider component
export const AppContextProvider = ({children}) => {
  // DarkMode
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  const [storage, setStorageState] = useState(false);
  const toggleStorage = () => {
    setStorageState(storage => !storage);
  };

  // Bookmarks
  const [bookmarksList, setBookmarksList] = useState([]);

  // Load bookmarks from AsyncStorage when the app starts
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem('bookmarksList');
        if (storedBookmarks) {
          setBookmarksList(JSON.parse(storedBookmarks));
        }
      } catch (error) {
        console.error('Failed to load bookmarks from storage', error);
      }
    };

    loadBookmarks();
  }, []);

  // Save bookmarks to AsyncStorage whenever they change
  useEffect(() => {
    const saveBookmarks = async () => {
      try {
        await AsyncStorage.setItem(
          'bookmarksList',
          JSON.stringify(bookmarksList),
        );
      } catch (error) {
        console.error('Failed to save bookmarks to storage', error);
      }
    };

    saveBookmarks();
  }, [bookmarksList]);

  const addToBookmarks = item => {
    if (!bookmarksList.includes(item)) {
    setBookmarksList(prevList => [...prevList, item]);
    }
    console.log(
      `AppContext Screen Article added, number of articles: ${bookmarksList.length}`,
    );
  };

  const removeFromBookmarks = item => {
    if (bookmarksList.includes(item)) {
      setBookmarksList(prevList =>
        prevList.filter(bookmark => bookmark !== item),
      );
    }
    console.log(
      `AppContext Screen Article removed, number of articles: ${bookmarksList.length}`,
    );
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
