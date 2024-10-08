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
import {getStyles, colors} from "../styles";
import TopHeaderBar from "../components/HeaderBar";



const SettingsScreen = ({navigation}) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const styles = getStyles(darkMode);

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const toggleNotifications = () => setNotificationsEnabled((prev) => !prev);

  return (
    <SafeAreaView style={{backgroundColor:darkMode?colors.bgDarkColor : colors.bgLightColor, flex:1}}>
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

        <SettingButton
          label="Set Default Category"
          buttonText="Select Category"
          onPress={() => {}}
          styles={styles}
        />
        <SettingButton
          label="Manage Bookmarks"
          buttonText="View Bookmarks"
          onPress={() => navigation.navigate("Bookmarks")}
          styles={styles}
        />
        <SettingButton
          label="Cache"
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


// Custom component for settings with a switch
const SettingSwitch = ({ label, value, onValueChange, styles }) => (
  <View style={styles.settingsRow}>
    <Text style={styles.settingsText}>{label}</Text>
    <Switch value={value} onValueChange={onValueChange}   thumbColor={colors.accent} trackColor={{ false:'lightgrey', true: 'grey' }}

    />
  </View>
);

// Custom component for settings with a button
const SettingButton = ({ label, buttonText, onPress, styles }) => (
  <View style={styles.settingsOption}>
    <Text style={styles.settingsText}>{label}</Text>
    <TouchableOpacity style={styles.settingsButton} onPress={onPress} activeOpacity={0.6}>
      <Text style={{color:colors.bgLightColor}}>{buttonText}</Text>
    </TouchableOpacity>
  </View>
);