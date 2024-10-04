import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ArticleScreen from "../screens/ArticlesScreen";
import SearchScreen from "../screens/SearchScreen"

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
      <Stack.Navigator
        screenOptions={() => ({
          headerShown:false
        })}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ }}
        />

        <Stack.Screen
          name="Article"
          component={ArticleScreen}
          options={{ }}
          
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ }}
        />
      </Stack.Navigator>
  );
};

export default HomeStackNavigator;