import React from "react";
import { WebView } from "react-native-webview";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const CategoriesArticle = () => {
  const { url } = useLocalSearchParams();
  return (
    <WebView
      style={{ marginBottom: 68 }}
      source={{ uri: url as string }}
      cacheEnabled={false}
      // cacheMode="LOAD_CACHE_ELSE_NETWORK"
      startInLoadingState={true}
      renderError={() => <Text>Failed to load the article</Text>}
    />
  );
};

export default CategoriesArticle;
