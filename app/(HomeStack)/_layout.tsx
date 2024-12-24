import React, { useState } from "react";
import { Link, router, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
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
          name="index"
          options={{
            title: "Top Headlines",
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "semibold",
            },
            headerRight: () => {
              return (
                <Link href={"/(HomeStack)/SearchScreen"} style={{ zIndex: 10 }}>
                  <MaterialIcons
                    onPress={() => router.navigate("/(HomeStack)/SearchScreen")}
                    name={"search"}
                    size={24}
                    color={darkMode ? "white" : colors.accent}
                  />
                </Link>
              );
            },
          }}
        />

        <Stack.Screen
          name="Article"
          options={{
            title: "Article",
          }}
        />
        <Stack.Screen
          name="SearchScreen"
          options={{
            headerShown: false,
            title: "Search",
          }}
        />
      </Stack>
    </View>
  );
};

export default _layout;
