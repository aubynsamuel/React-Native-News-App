import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "../../context/AppContext";
import { colors } from "../../constants/colors";
import { router, useFocusEffect } from "expo-router";
import SettingSwitch from "@/components/SettingsSwitch";
import SettingButton from "@/components/SettingsButton";

const SettingsScreen = () => {
  const { darkMode, toggleDarkMode, bookmarksList } = useAppContext();
  const styles = getSettingsStyles(darkMode);
  const [storageSize, setStorageSize] = useState(0);

  const calculateStorageSize = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const keysToInclude = allKeys.filter((key) => key !== "bookmarksList");
      const result = await AsyncStorage.multiGet(keysToInclude);
      let totalSize = 0;
      result.forEach(([key, value]) => {
        totalSize += key.length + (value ? value.length : 0);
      });
      setStorageSize(totalSize);
    } catch {
      /* empty */
    }
  };

  useFocusEffect(() => {
    calculateStorageSize();
  });

  const clearCache = async () => {
    try {
      await AsyncStorage.clear();
      setStorageSize(0);
    } catch {
      /* empty */
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: darkMode
          ? colors.bgDarkColor
          : colors.bgLightSecondary,
        flex: 1,
      }}
    >
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
          onPress={() => router.navigate("/(settings)/BookmarksScreen")}
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

export const getSettingsStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    settingsOption: {
      padding: 15,
      backgroundColor: isDarkMode ? colors.bgDarkSecondary : "#ebebeb",
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius: 12,
    },
    settingsText: {
      fontSize: 16,
      color: isDarkMode ? colors.textLight : colors.textDark,
      fontWeight: "500",
    },
    settingsButton: {
      marginTop: 15,
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: colors.accent,
      borderRadius: 25,
      alignItems: "center",
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
    settingsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
      backgroundColor: isDarkMode ? colors.bgDarkSecondary : "#ebebeb",
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius: 12,
    },
  });
};

export default SettingsScreen;
