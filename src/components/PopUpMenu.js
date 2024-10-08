import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useTheme } from '../ThemeContext';

const PopUpMenu = ({ item }) => {
  const { addToBookmarks, removeFromBookmarks, darkMode } = useTheme();
  
  return (
    <View style={styles.container}>
      <Menu>
        <MenuTrigger
          style={styles.trigger}
          customStyles={{
            triggerWrapper: styles.triggerWrapper,
          }}>
          <Icon name="more-vert" color={darkMode?"white":"black"} size={23} />
        </MenuTrigger>
        <MenuOptions >
          <MenuOption onSelect={() => addToBookmarks(item)}>
            <Text style={styles.menuText}>Add to bookmarks</Text>
          </MenuOption>
          <MenuOption onSelect={() => removeFromBookmarks(item)}>
            <Text style={styles.menuText}>Remove from bookmarks</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  trigger: {
    padding: 5,
    borderRadius: 5,
    
  },
  triggerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    fontSize: 15,
    padding: 10,
    // color:darkMode?"white":"black",
    backgroundColor: '#333',
  },
  menuOption: {
    padding: 10,
    backgroundColor:"red"
  },
});


export default PopUpMenu;