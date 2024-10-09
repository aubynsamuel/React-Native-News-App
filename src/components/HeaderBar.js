import { React } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getStyles } from "../styles";
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const TopHeaderBar = ({ title, backButtonShown, theme }) => {
  const styles = getStyles(theme);
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      {backButtonShown && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" style={styles.headerBarIcon} size={25} />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle} >{title}</Text>
    </View>
  );
};
export default TopHeaderBar;
