import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '../NewsAppContext';
import {colors} from '../styles';

const BookmarksNewsCard = ({item, onPress, children}) => {
  const [loading, setLoading] = useState(true);
  const {darkMode} = useTheme();
  const styles = getStyles(darkMode);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.8}>
      <Image
        source={{uri: item.urlToImage}}
        // source={require('./looking_for_a_friend_4k_hd_inspirational.jpg')}
        style={styles.image}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={3}>
          {item.title}
        </Text>

        <View style={styles.PopUpMenuAndDescription}>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
          {children}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = darkMode =>
  StyleSheet.create({
    card: {
      marginBottom: 15,
      margin: 5,
      flexDirection: 'row',
    },
    image: {
      width: 150,
      height: 120,
      marginRight: 10,
      borderRadius: 8,
    },
    textContainer: {
      flex: 1,
      justifyContent: 'space-evenly',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: darkMode ? colors.bgLightColor : '#333',
    },
    description: {
      fontSize: 13,
      color: darkMode ? '#fff9' : '#666',
    },
    PopUpMenuAndDescription: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '90%',
    },
  });

export default BookmarksNewsCard;
