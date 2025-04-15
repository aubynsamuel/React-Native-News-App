import { Text, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useAppContext } from "../context/AppContext";
import { NewsItem } from "@/types/types";
import { colors } from "@/constants/colors";

const PopUpMenu = ({
  item,
  add,
  remove,
}: {
  item: NewsItem;
  add: boolean;
  remove: boolean;
}) => {
  const { addToBookmarks, removeFromBookmarks, darkMode } = useAppContext();
  const styles = getStyles(darkMode);

  return (
    <Menu>
      <MenuTrigger style={{ top: 5 }}>
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

const getStyles = (darkMode: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: darkMode ? colors.bgDarkColor : colors.bgLightColor,
      elevation: 6,
    },
    menuText: {
      fontSize: 15,
      margin: 8,
      color: darkMode ? "white" : "black",
    },
  });

export default PopUpMenu;
