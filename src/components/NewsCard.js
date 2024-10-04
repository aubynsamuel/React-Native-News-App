import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import getStyles from "../styles";

const NewsCard = ({ item, onPress, theme }) => {
  const [loading, setLoading] = useState(true);
  const styles = getStyles(theme);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        {loading && (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="purple"
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
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCard;
