import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { useTheme , AppContextType} from "../NewsAppContext";
import { colors } from "../styles";

export interface NewsItem {
  urlToImage: string;
  title: string;
  description: string;
  url: string;
}
const BookmarksNewsCard = ({
  item,
  onPress,
  children,
}: {
  item: NewsItem;
  onPress: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme() as AppContextType;
  const styles = getStyles(darkMode);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.8}>
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

const getStyles = (darkMode: Boolean) =>
  StyleSheet.create({
    card: {
      marginBottom: 15,
      margin: 5,
      flexDirection: "row",
    },
    image: {
      width: 150,
      height: 120,
      marginRight: 10,
      borderRadius: 8,
    },
    textContainer: {
      flex: 1,
      justifyContent: "space-evenly",
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: darkMode ? colors.bgLightColor : "#333",
    },
    description: {
      fontSize: 13,
      color: darkMode ? "#fff9" : "#666",
      width: "85%",
    },
    PopUpMenuAndDescription: {
      justifyContent: "space-evenly",
      flexDirection: "row",
      width: "100%",
    },
  });

export default BookmarksNewsCard;
