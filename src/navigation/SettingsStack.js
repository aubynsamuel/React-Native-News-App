import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../screens/SettingsScreen"; 
import BookmarksScreen from "../screens/BookmarksScreen";
import BookmarkArticle from "../screens/BookmarkArticles";

const Stack = createStackNavigator();

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings" }} 
      />
      <Stack.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{ title: "Bookmarks" }} 
      />
      <Stack.Screen
        name="BookmarksArticles"
        component={BookmarkArticle}
        options={{ }} 
      />

    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
