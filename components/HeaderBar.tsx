import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/colors";
import { MaterialIcons as Icon } from "@expo/vector-icons";

const TopHeaderBar = ({
  title,
  backButtonShown,
  theme,
}: {
  title: string;
  backButtonShown: boolean;
  theme: boolean;
}) => {
  const styles = getStyles(theme);
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      {backButtonShown && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" style={styles.headerBarIcon} size={25} />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    headerTitle: {
      fontSize: 20,
      fontWeight: "600",
      marginHorizontal: 10,
      color: isDarkMode ? colors.textLight : colors.accent,
    },
    headerBarIcon: {
      color: isDarkMode ? colors.textLight : colors.accent,
      marginHorizontal: 10,
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 15,
      paddingVertical: 12,
      backgroundColor: isDarkMode ? colors.bgDarkColor : colors.bgLightColor,
      elevation: 3,
      borderBottomWidth: isDarkMode ? 1 : 0.5,
      borderBottomColor: isDarkMode
        ? "rgba(255,255,255,0.1)"
        : "rgba(0,0,0,0.05)",
      paddingTop: Platform.OS === "android" ? 12 : 12,
      shadowColor: isDarkMode ? "#000" : "#888",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDarkMode ? 0.5 : 0.1,
      shadowRadius: 5,
    },
  });
};
export default TopHeaderBar;
