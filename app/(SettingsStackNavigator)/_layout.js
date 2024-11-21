import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "../../NewsAppContext";

const _layout = () => {
  const { darkMode } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        animation: "simple_push",
        navigationBarColor: darkMode ? "black" : "white",
        headerStyle: {
          backgroundColor: darkMode ? "black" : "white",
        },
        headerTitleStyle: {
          color: darkMode ? "white" : "black",
        },
        headerTintColor: darkMode ? "white" : "black",
      }}
    >
      <Stack.Screen
        name="Settings"
        options={{
          title: "Settings",
        }}
      />
      <Stack.Screen
        name="Bookmarks"
        options={{
          title: "Bookmarks",
        }}
      />
      <Stack.Screen
        name="BookmarksArticles"
        options={{
          title: "Article",
        }}
      />
    </Stack>
  );
};

export default _layout;
