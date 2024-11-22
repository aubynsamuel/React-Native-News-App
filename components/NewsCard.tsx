import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  GestureResponderEvent,
} from "react-native";
import { getStyles, colors } from "../styles";
import { useTheme, AppContextType } from "../NewsAppContext";

interface NewsItem {
  urlToImage: string;
  title: string;
  description: string;
  url: string;
}

const NewsCard = ({
  children,
  item,
  onPress,
}: {
  children?: React.ReactNode;
  item: NewsItem;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme() as AppContextType;
  const styles = getStyles(darkMode);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.8}>
      <View>
        {loading && (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color={colors.accent}
          />
        )}
        <Image
          source={{ uri: item.urlToImage }}
          style={styles.image}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </View>

      <View style={styles.content}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "90%" }}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
          </View>

          {/* Pop up Menus Component */}
          {children}
        </View>

        <Text style={styles.description} numberOfLines={1}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCard;
