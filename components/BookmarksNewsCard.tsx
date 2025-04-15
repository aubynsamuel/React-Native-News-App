import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";
import { useAppContext } from "../context/AppContext";
import { colors } from "../constants/colors";
import { Image } from "expo-image";
import { NewsItem } from "@/types/types";

interface BookNewsCardInterface {
  item: NewsItem;
  onPress: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
}

const BookmarksNewsCard = ({
  item,
  onPress,
  children,
}: BookNewsCardInterface) => {
  const [loading, setLoading] = useState(true);
  const { darkMode } = useAppContext();
  const styles = getStyles(darkMode);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.8}>
      {loading && (
        <View
          style={[
            {
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: darkMode ? "#121212" : "#f7f7f7",
              height: 200,
              zIndex: 1,
            },
            StyleSheet.absoluteFill,
          ]}
        >
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      )}

      <Image
        source={{ uri: item.urlToImage }}
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

const getStyles = (darkMode: boolean) =>
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
