import { getSettingsStyles } from "@/app/(settings)/SettingsScreen";
import { colors } from "@/constants/colors";
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const SettingButton = ({
  label,
  buttonText,
  onPress,
  styles,
}: {
  label: string;
  buttonText: string;
  onPress: () => void;
  styles: ReturnType<typeof getSettingsStyles>;
}) => (
  <View style={styles.settingsOption}>
    <Text style={styles.settingsText}>{label}</Text>
    <TouchableOpacity
      style={styles.settingsButton}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Text style={{ color: colors.bgLightColor }}>{buttonText}</Text>
    </TouchableOpacity>
  </View>
);

export default SettingButton;
