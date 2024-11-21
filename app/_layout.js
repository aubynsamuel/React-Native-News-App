import "react-native-reanimated";
import React from "react";
import { MenuProvider } from "react-native-popup-menu";
import { useTheme, AppContextProvider } from "../NewsAppContext";
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
  const { darkMode } = useTheme();
  const styles = getStyles(darkMode);

  const TabBarIcon = ({ name, color }) => {
    return <MaterialIcons name={name} color={color} size={24} />;
  };

  return (
    <MenuProvider>
      <StatusBar
        animated={true}
        backgroundColor={darkMode ? colors.bgDarkColor : colors.bgLightColor}
        style={darkMode ? "light" : "dark"}
      />
      <Tabs
        screenOptions={() => ({
          headerShown: false,
          tabBarActiveTintColor: darkMode ? colors.bgLightColor : colors.accent,
          tabBarInactiveTintColor: darkMode ? "#fff8" : "#666",
          tabBarActiveBackgroundColor:"#fec0f4",
          tabBarShowLabel: true,
          tabBarLabelStyle:{
            color: darkMode? colors.bgDarkColor : colors.accent,
          },
          tabBarStyle: {
            position:"absolute",
            bottom:10,
            width:"85%",
            elevation:3,
            borderRadius:50,
            height: 55,
            marginHorizontal:"7%",
          },
        })}
      >
        <Tabs.Screen
          name="(HomeStack)"
          options={{
            title: "Home",
            tabBarIcon: () => <TabBarIcon name="home" color={"black"} />
          }}
        />

        <Tabs.Screen
          name="(CategoriesStack)"
          options={{
            title: "Categories",
            tabBarIcon: () => <TabBarIcon name="category" color={"black"} />
          }}
        />

        <Tabs.Screen
          name="(SettingsStackNavigator)"
          options={{
            title: "Settings",
            tabBarIcon: () => <TabBarIcon name="settings" color={"black"} />
          }}
        />
      </Tabs>
    </MenuProvider>
  );
}
