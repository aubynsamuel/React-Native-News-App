import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContextType, NewsItem } from "@/types/types";

// Storage keys as constants to avoid typos and improve maintainability
const STORAGE_KEYS = {
  BOOKMARKS: "bookmarksList",
  DARK_MODE: "darkMode",
};

const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook with proper error handling
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [bookmarksList, setBookmarksList] = useState<NewsItem[]>([]);

  useEffect(() => {
    const loadPersistedData = async () => {
      try {
        const [storedBookmarks, storedDarkMode] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.BOOKMARKS),
          AsyncStorage.getItem(STORAGE_KEYS.DARK_MODE),
        ]);

        if (storedBookmarks) {
          setBookmarksList(JSON.parse(storedBookmarks));
        }

        if (storedDarkMode) {
          setDarkMode(JSON.parse(storedDarkMode));
        }
      } catch (error) {
        console.error("Failed to load persisted data:", error);
      }
    };

    loadPersistedData();
  }, []);

  // Save bookmarks when they change
  useEffect(() => {
    const saveBookmarks = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEYS.BOOKMARKS,
          JSON.stringify(bookmarksList)
        );
      } catch (error) {
        console.error("Failed to save bookmarks:", error);
      }
    };

    saveBookmarks();
  }, [bookmarksList]);

  // Save dark mode preference when it changes
  useEffect(() => {
    const saveDarkMode = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEYS.DARK_MODE,
          JSON.stringify(darkMode)
        );
      } catch (error) {
        console.error("Failed to save dark mode preference:", error);
      }
    };

    saveDarkMode();
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  const addToBookmarks = (item: NewsItem) => {
    // Improved equality check using unique identifier if available
    // or fall back to strict comparison
    const itemExists = bookmarksList.some(
      (bookmark) => bookmark.url === item.url || bookmark === item
    );

    if (!itemExists) {
      setBookmarksList((prevList) => [...prevList, item]);
    }
  };

  const removeFromBookmarks = (item: NewsItem) => {
    setBookmarksList((prevList) =>
      prevList.filter((bookmark) =>
        bookmark.url ? bookmark.url !== item.url : bookmark !== item
      )
    );
  };

  const contextValue: AppContextType = {
    darkMode,
    toggleDarkMode,
    bookmarksList,
    addToBookmarks,
    removeFromBookmarks,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
