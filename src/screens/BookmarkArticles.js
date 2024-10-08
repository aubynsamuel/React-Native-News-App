import React from "react";
import { WebView } from "react-native-webview";
import { useTheme } from "../ThemeContext";
import TopHeaderBar from "../components/HeaderBar";

const BookmarkArticle = ({ route }) => {
  const { darkMode } = useTheme();
  const { url } = route.params;
  return (
    <>
      <TopHeaderBar
        title={"Article"}
        backButtonShown={true}
        theme={darkMode}
      />

      <WebView
        source={{ uri: url }}
        cacheEnabled={true}
        cacheMode="LOAD_CACHE_ELSE_NETWORK"
        startInLoadingState={true}
        renderError={() => <Text>Failed to load the article</Text>}
      />
    </>
  );
};

export default BookmarkArticle;
