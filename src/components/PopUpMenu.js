import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useTheme} from '../NewsAppContext';

const PopUpMenu = ({item, add, remove}) => {
  const {addToBookmarks, removeFromBookmarks, darkMode} = useTheme();
  const styles = getStyles(darkMode);

  return (
    <Menu>
      <MenuTrigger>
        <Icon name="more-vert" color={darkMode ? 'white' : 'black'} size={23} />
      </MenuTrigger>
      <MenuOptions style={styles.container}>
        {add && <MenuOption onSelect={() => addToBookmarks(item)}>
          <Text style={styles.menuText}>Add to bookmarks</Text>
        </MenuOption>}

        {remove && <MenuOption onSelect={() => removeFromBookmarks(item)}>
          <Text style={styles.menuText}>Remove from bookmarks</Text>
        </MenuOption>}
      </MenuOptions>
    </Menu>
  );
};

const getStyles = darkMode =>
  StyleSheet.create({
    container: {
      backgroundColor:darkMode?"grey":"lightgrey",
      elevation:6,
    },
    menuText: {
      fontSize: 15,
      margin: 8,
      color: darkMode ? 'white' : 'black',
    },
  });

export default PopUpMenu;
