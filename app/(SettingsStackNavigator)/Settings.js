import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Switch,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '../../NewsAppContext';
import {getStyles, colors} from '../../styles';
// import TopHeaderBar from '../../components/HeaderBar';
import { router } from 'expo-router';

const SettingsScreen = () => {
  const {darkMode, toggleDarkMode, bookmarksList, storage} = useTheme();
  const styles = getStyles(darkMode);
  const [storageSize, setStorageSize] = useState(0);
  
  
  const calculateStorageSize = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const keysToInclude = allKeys.filter(key => key !== 'bookmarksList');
      const result = await AsyncStorage.multiGet(keysToInclude);
      let totalSize = 0;
      result.forEach(([key, value]) => {
        totalSize += key.length + value.length;
      });
      setStorageSize(totalSize);
    } catch (error) {
    }
  };

  useEffect(() => {
    calculateStorageSize();
  }, [storage]);

  const clearCache = async () => {
    try {
      await AsyncStorage.clear();
      setStorageSize(0);
    } catch (error) {
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: darkMode ? colors.bgDarkColor : colors.bgLightColor,
        flex: 1,
      }}>
      {/* <TopHeaderBar
        title={'Settings'}
        backButtonShown={false}
        theme={darkMode}
      /> */}
      <ScrollView>
        <SettingSwitch
          label="Dark Mode"
          value={darkMode}
          onValueChange={toggleDarkMode}
          styles={styles}
        />

        <SettingButton
          label={`Bookmarks (${bookmarksList.length})`}
          buttonText="View Bookmarks"
          onPress={() => router.navigate('/(SettingsStackNavigator)/Bookmarks')}
          styles={styles}
        />
        <SettingButton
          label={`Cache (${(storageSize / 1024).toFixed(2)} KB)`}
          buttonText="Clear Now"
          onPress={clearCache}
          styles={styles}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

// Custom component for settings with a switch
const SettingSwitch = ({label, value, onValueChange, styles}) => (
  <View style={styles.settingsRow}>
    <Text style={styles.settingsText}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onValueChange}
      thumbColor={colors.accent}
      trackColor={{false: 'lightgrey', true: 'grey'}}
    />
  </View>
);

// Custom component for settings with a button
const SettingButton = ({label, buttonText, onPress, styles}) => (
  <View style={styles.settingsOption}>
    <Text style={styles.settingsText}>{label}</Text>
    <TouchableOpacity
      style={styles.settingsButton}
      onPress={onPress}
      activeOpacity={0.6}>
      <Text style={{color: colors.bgLightColor}}>{buttonText}</Text>
    </TouchableOpacity>
  </View>
);
