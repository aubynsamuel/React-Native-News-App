import React from "react";
import { Stack } from "expo-router";
import { useTheme, AppContextType } from "../../NewsAppContext";
import { View } from "react-native";
import { colors } from "@/styles";

const _layout = () => {
  const { darkMode } = useTheme() as AppContextType;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkMode ? colors.bgDarkColor : colors.bgLightColor,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: true,
          animation: "simple_push",
          navigationBarColor: darkMode ? "black" : "white",
          headerStyle: {
            backgroundColor: darkMode ? "black" : "white",
          },
          headerTitleStyle: {
            color: darkMode ? "white" : colors.accent,
          },
          headerTintColor: darkMode ? "white" : colors.accent,
        }}
      >
        <Stack.Screen
          name="CategoriesScreen"
          options={{
            headerShown: false,
            title: "Categories",
          }}
        />
        <Stack.Screen
          name="CategoriesArticle"
          options={{
            title: "Article",
          }}
        />
      </Stack>
    </View>
  );
};

export default _layout;
