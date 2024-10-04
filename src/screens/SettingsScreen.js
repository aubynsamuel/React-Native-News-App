import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../ThemeContext";
import getStyles from "../styles";
import TopHeaderBar from "../components/HeaderBar";

// Custom component for settings with a switch
const SettingSwitch = ({ label, value, onValueChange, styles }) => (
  <View style={styles.settingsRow}>
    <Text style={styles.settingsText}>{label}</Text>
    <Switch value={value} onValueChange={onValueChange}   thumbColor={'purple'} trackColor={{ false:'lightgrey', true: 'grey' }}

    />
  </View>
);

// Custom component for settings with a button
const SettingButton = ({ label, buttonText, onPress, styles }) => (
  <View style={styles.settingsOption}>
    <Text style={styles.settingsText}>{label}</Text>
    <TouchableOpacity style={styles.settingsButton} onPress={onPress} activeOpacity={0.6}>
      <Text style={{color:"#fff"}}>{buttonText}</Text>
    </TouchableOpacity>
  </View>
);

const SettingsScreen = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const styles = getStyles(darkMode);

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [dataSaverMode, setDataSaverMode] = React.useState(false);

  const toggleNotifications = () => setNotificationsEnabled((prev) => !prev);
  const toggleDataSaverMode = () => setDataSaverMode((prev) => !prev);

  return (
    <SafeAreaView style={{backgroundColor:darkMode?"#121212" : "#f9f9f9", flex:1}}>
      <TopHeaderBar title={"Settings"} backButtonShown={false} theme={darkMode} />
      <ScrollView>
        <SettingSwitch
          label="Dark Mode"
          value={darkMode}
          onValueChange={toggleDarkMode}
          styles={styles}
        />
        <SettingSwitch
          label="Enable Notifications"
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          styles={styles}
        />
        <SettingSwitch
          label="Data Saver Mode"
          value={dataSaverMode}
          onValueChange={toggleDataSaverMode}
          styles={styles}
        />

        {/* New Settings Options Below */}
        <SettingButton
          label="Set Default News Category"
          buttonText="Select Category"
          onPress={() => console.log("Navigate to category selection screen")}
          styles={styles}
        />
        <SettingButton
          label="Article Font Size"
          buttonText="Adjust Font Size"
          onPress={() => console.log("Navigate to font size adjustment")}
          styles={styles}
        />
        <SettingButton
          label="Manage Bookmarks"
          buttonText="View Bookmarks"
          onPress={() => console.log("Navigate to bookmark management")}
          styles={styles}
        />
        <SettingButton
          label="Set Article Language"
          buttonText="Select Language"
          onPress={() => console.log("Navigate to language selection")}
          styles={styles}
        />
        <SettingButton
          label="Clear Cache"
          buttonText="Clear Now"
          onPress={() => console.log("Clear app cache")}
          styles={styles}
        />
        <SettingButton
          label="About This App"
          buttonText="Learn More"
          onPress={() => console.log("Navigate to about screen")}
          styles={styles}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
