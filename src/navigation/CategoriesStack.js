import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoriesArticle from "../screens/CategoriesArticle";


const Stack = createStackNavigator();

const CategoriesStack = () => {
    return (
      <Stack.Navigator
        screenOptions={() => ({
          headerShown:false
        })}
      >
        <Stack.Screen
          name="CategoriesScreen"
          component={CategoriesScreen}
          options={{  }}
        />
        <Stack.Screen
          name="CategoriesArticle"
          component={CategoriesArticle}
          options={{}}
        />
      </Stack.Navigator>
    );
  };
  

export default CategoriesStack;