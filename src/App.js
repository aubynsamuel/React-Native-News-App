import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import { StatusBar } from "expo-status-bar";
import {ThemeProvider, useTheme} from './ThemeContext';
import TabNavigator from './navigation/TabNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const {darkMode} = useTheme(); // Call useTheme inside the provider

  return (
    <NavigationContainer>
      <TabNavigator />
      <StatusBar
      animated={true}
        backgroundColor={darkMode ? "#121212" : "#f9f9f9"}
        barStyle={darkMode?"light-content":"dark-content"}
      />
    </NavigationContainer>
  );
}

