import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

export const useTheme = () => useContext(AppContext);

export const AppContextProvider = ({children}) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  const [storage, setStorageState] = useState(false);
  const toggleStorage = () => {
    setStorageState(storage => !storage);
  };

  const [bookmarksList, setBookmarksList] = useState([]);

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
