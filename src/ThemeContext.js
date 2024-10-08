import React, {createContext, useState, useContext} from 'react';
// Create a Context for the theme (light/dark mode)
const ThemeContext = createContext();

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);

// Create a provider component
export const ThemeProvider = ({children}) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  let bookmarksList = []
  const addToBookmarks = (item) => {
    if(!bookmarksList.includes(item)){
      bookmarksList.push(item)
    }
    console.log(`ThemeContext Screen Article added, number of articles: ${bookmarksList.length}` )
  };
  const removeFromBookmarks = (item) => {
    if(bookmarksList.includes(item)){
      let itemIndex = bookmarksList.indexOf(item)
      bookmarksList.splice(itemIndex, 1)
    }
    console.log(`ThemeContext Screen Article removed, number of articles: ${bookmarksList.length}` )
  };

  return (
    <ThemeContext.Provider
      value={{darkMode, toggleDarkMode, bookmarksList, addToBookmarks, removeFromBookmarks}}>
      {children}
    </ThemeContext.Provider>
  );
};
