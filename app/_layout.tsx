import "react-native-reanimated";
import React from "react";
import { MenuProvider } from "react-native-popup-menu";
import {
  useTheme,
  AppContextProvider,
  AppContextType,
} from "../NewsAppContext";
import { StatusBar } from "expo-status-bar";
import { getStyles, colors } from "../styles";
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
  const { darkMode } = useTheme() as AppContextType;
  const styles = getStyles(darkMode);

  const TabBarIcon = ({
    focused,
    name,
    color,
  }: {
    focused: boolean;
    name: string;
    color?: string;
  }) => {
    return (
      <MaterialIcons
        name={name as any}
        color={(color = focused ? colors.accent : "black")}
        size={24}
      />
    );
  };

  return (
    <MenuProvider>
      <StatusBar
        animated={true}
        backgroundColor={darkMode ? colors.bgDarkColor : colors.bgLightColor}
        style={darkMode ? "light" : "dark"}
      />
      <Tabs
        initialRouteName="(HomeStack)"
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
          name="(HomeStack)"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="home" />
            ),
          }}
        />

        <Tabs.Screen
          name="(CategoriesStack)"
          options={{
            title: "Categories",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="category" />
            ),
          }}
        />

        <Tabs.Screen
          name="(SettingsStackNavigator)"
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
