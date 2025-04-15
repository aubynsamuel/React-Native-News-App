import React from "react";
import { WebView } from "react-native-webview";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const BookmarkArticle = () => {
  const { url } = useLocalSearchParams();
  return (
    <WebView
      style={{ marginBottom: 68 }}
      source={{ uri: typeof url === "string" ? url : "" }}
      cacheEnabled={false}
      // cacheMode="LOAD_CACHE_ELSE_NETWORK"
      startInLoadingState={true}
      renderError={() => <Text>Failed to load the article</Text>}
    />
  );
};

export default BookmarkArticle;
