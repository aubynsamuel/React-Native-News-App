import { Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useTheme ,AppContextType} from "../NewsAppContext";

const PopUpMenu = ({
  item,
  add,
  remove,
}: {
  item: any;
  add: Boolean;
  remove: Boolean;
}) => {
  const { addToBookmarks, removeFromBookmarks, darkMode } = useTheme() as AppContextType;
  const styles = getStyles(darkMode);

  return (
    <Menu>
      <MenuTrigger style={{ marginRight: 5, top: 5 }}>
        <Icon name="more-vert" color={darkMode ? "white" : "black"} size={25} />
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={styles.container}>
        {add && (
          <MenuOption onSelect={() => addToBookmarks(item)}>
            <Text style={styles.menuText}>Add to bookmarks</Text>
          </MenuOption>
        )}

        {remove && (
          <MenuOption onSelect={() => removeFromBookmarks(item)}>
            <Text style={styles.menuText}>Remove from bookmarks</Text>
          </MenuOption>
        )}
      </MenuOptions>
    </Menu>
  );
};

const getStyles = (darkMode: Boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: darkMode ? "grey" : "lightgrey",
      elevation: 6,
    },
    menuText: {
      fontSize: 15,
      margin: 8,
      color: darkMode ? "white" : "black",
    },
  });

export default PopUpMenu;
