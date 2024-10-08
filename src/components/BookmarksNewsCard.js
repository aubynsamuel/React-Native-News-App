import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useTheme} from '../ThemeContext';
import {colors} from '../styles';

const BookmarksNewsCard = ({item, onPress, children}) => {
  const [loading, setLoading] = useState(true);
  const {darkMode} = useTheme();
  const styles = getStyles(darkMode);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.8}>
      <View style={styles.container}>
        <Image
          source={{ uri: item.urlToImage }}
          // source={require('./looking_for_a_friend_4k_hd_inspirational.jpg')}
          style={styles.image}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {item.title}
          </Text>

          <View style={styles.PopUpMenu}>
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
            {children}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = darkMode =>
  StyleSheet.create({
    card: {
      overflow: 'hidden',
      marginBottom: 15,
      margin: 5,
      borderRadius: 15,
    },
    container: {
      flexDirection: 'row',
    },
    image: {
      width: 150, // Adjust width as needed
      height: 120, // Adjust height as needed
      marginRight: 10, // Add spacing between image and text
    },
    textContainer: {
      flex: 1, // Allow text container to take up remaining space
      justifyContent: 'space-evenly', // Distribute elements vertically
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: darkMode ? colors.bgLightColor : '#333',
    },
    description: {
      fontSize: 13, // Increase font size if needed
      color: darkMode ? '#fff9' : '#666',
    },
    PopUpMenu:{
      justifyContent:"space-between",
      flexDirection:"row"  ,
      // flex:1  ,
      width:"83%"  
    }
  });

export default BookmarksNewsCard;
