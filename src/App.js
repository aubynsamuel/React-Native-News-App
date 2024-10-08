import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider, useTheme} from './ThemeContext';
import TabNavigator from './navigation/TabNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {colors} from './styles';
import { MenuProvider } from 'react-native-popup-menu';


export default function App() {
  return (
    <ThemeProvider>
      <MenuProvider>
        <SafeAreaProvider>
          <AppContent />
        </SafeAreaProvider>
      </MenuProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const {darkMode} = useTheme();

  return (
    <NavigationContainer>
      <TabNavigator />
      <StatusBar
        animated={true}
        backgroundColor={darkMode ? colors.bgDarkColor : colors.bgLightColor}
        barStyle={darkMode ? 'light-content' : 'dark-content'}
      />
    </NavigationContainer>
  );
}
