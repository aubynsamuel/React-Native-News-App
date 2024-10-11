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
      }
    };

    saveBookmarks();
  }, [bookmarksList]);

  const addToBookmarks = item => {
    if (!bookmarksList.includes(item)) {
    setBookmarksList(prevList => [...prevList, item]);
    }
  };

  const removeFromBookmarks = item => {
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
