import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import HomeStackNavigator from "./HomeStackNavigator";
import CategoriesStackNavigator from "./CategoriesStack";
import SettingsStackNavigator from "./SettingsStack";
import { useTheme } from "../NewsAppContext";
import {getStyles, colors} from "../styles"; 

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { darkMode } = useTheme();
  const styles = getStyles(darkMode); 

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "HomeStack") {
            iconName = "home";
          } else if (route.name === "CategoriesStack") {
            iconName = "category";
          } else if (route.name === "SettingsStackNavigator") {
            iconName = "settings";
          }
          return <Icon name={iconName} size={26} color={color} />;
        },
        headerShown:false,
        tabBarActiveTintColor: darkMode ? colors.bgLightColor : colors.accent,
        tabBarInactiveTintColor: darkMode ? "#fff8" : "#666", 
        // tabBarActiveBackgroundColor:"#fec0f4",
        tabBarShowLabel:true,
        tabBarLabelPosition:"below-icon",
        tabBarLabelStyle:{
          bottom:8
        },
        tabBarStyle: {
          backgroundColor: darkMode ? colors.bgDarkColor : colors.bgLightColor, 
          // position:"absolute",
          // bottom:10,
          // right:30,
          // left:30,
          // elevation:5,
          // borderRadius:50,
          height:55,          

        },
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{ title:"Home" }} 
      />

      <Tab.Screen
        name="CategoriesStack"
        component={CategoriesStackNavigator}
        options={{ title:"Categories" }}
      />

      <Tab.Screen
        name="SettingsStackNavigator"
        component={SettingsStackNavigator}
        options={{ title:"Settings"}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
