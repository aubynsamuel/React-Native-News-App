import React from "react";
import { colors } from "@/constants/colors";
import { View, Switch, Text } from "react-native";
import { getSettingsStyles } from "@/app/(settings)/SettingsScreen";

const SettingSwitch = ({
  label,
  value,
  onValueChange,
  styles,
}: {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  styles: ReturnType<typeof getSettingsStyles>;
}) => (
  <View style={styles.settingsRow}>
    <Text style={styles.settingsText}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onValueChange}
      thumbColor={colors.accent}
      trackColor={{ false: "gray", true: "white" }}
    />
  </View>
);

export default SettingSwitch;
