import "react-native-reanimated";
import React from "react";
import { MenuProvider } from "react-native-popup-menu";
import { AppContextProvider, useAppContext } from "../context/AppContext";
import { StatusBar } from "expo-status-bar";
import { colors } from "../constants/colors";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <AppContextProvider>
      <RootLayoutNav />
    </AppContextProvider>
  );
}

function RootLayoutNav() {
  const { darkMode } = useAppContext();

  const TabBarIcon = ({
    focused,
    name,
  }: {
    focused: boolean;
    name: string;
  }) => {
    return (
      <MaterialIcons
        name={name as keyof typeof MaterialIcons.glyphMap}
        color={focused === true ? colors.accent : "black"}
        size={24}
      />
    );
  };

  return (
    <MenuProvider>
      <StatusBar
        animated={true}
        backgroundColor={
          darkMode ? colors.bgDarkColor : colors.bgLightSecondary
        }
        style={darkMode ? "light" : "dark"}
      />
      <Tabs
        initialRouteName="(home)"
        screenOptions={() => ({
          headerShown: false,
          tabBarActiveBackgroundColor: "#fec0f4",
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            color: "black",
          },
          tabBarStyle: {
            position: "absolute",
            bottom: 10,
            width: "85%",
            elevation: 3,
            borderRadius: 50,
            height: 55,
            marginHorizontal: "7%",
            backgroundColor: darkMode ? "lightgrey" : colors.bgLightColor,
          },
        })}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="home" />
            ),
          }}
        />

        <Tabs.Screen
          name="(categories)"
          options={{
            title: "Categories",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="category" />
            ),
          }}
        />

        <Tabs.Screen
          name="(settings)"
          options={{
            title: "Settings",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="settings" />
            ),
          }}
        />
      </Tabs>
    </MenuProvider>
  );
}
