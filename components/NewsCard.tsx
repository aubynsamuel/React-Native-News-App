import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  GestureResponderEvent,
  Animated,
  StyleSheet,
} from "react-native";
import { colors } from "../constants/colors";
import { useAppContext } from "../context/AppContext";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { NewsItem } from "@/types/types";

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
  const { darkMode } = useAppContext();
  const fadeAnim = useState(new Animated.Value(0))[0];
  const styles = getStyles(darkMode);

  useEffect(() => {
    if (!loading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [loading]);

  // Format date if available
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  const formattedDate = formatDate(item.publishedAt);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Animated.View
        style={[
          styles.card,
          {
            margin: 10,
            borderRadius: 16,
            overflow: "hidden",
            backgroundColor: darkMode
              ? "rgba(30, 30, 30, 0.8)"
              : "rgba(255, 255, 255, 0.9)",
            shadowColor: darkMode ? "#000" : "#666",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: darkMode ? 0.5 : 0.1,
            shadowRadius: 8,
            elevation: 7,
            opacity: fadeAnim,
            transform: [
              {
                scale: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.95, 1],
                }),
              },
            ],
          },
        ]}
      >
        <View style={{ position: "relative" }}>
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
            source={{
              uri: item.urlToImage,
            }}
            style={[
              styles.image,
              {
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              },
            ]}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />

          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
            }}
          />

          {item.source?.name && (
            <View
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                backgroundColor: "rgba(0,0,0,0.6)",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                {item.source.name}
              </Text>
            </View>
          )}
        </View>

        <View style={[styles.content, { padding: 16 }]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <View style={{ width: "90%" }}>
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: 17,
                    fontWeight: "700",
                    lineHeight: 22,
                  },
                ]}
                numberOfLines={2}
              >
                {item.title}
              </Text>
            </View>
            {children}
          </View>

          <Text
            style={[
              styles.description,
              {
                fontSize: 14,
                marginTop: 8,
                lineHeight: 20,
                marginBottom: 12,
                width: "100%",
              },
            ]}
            numberOfLines={2}
          >
            {item.description}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              opacity: 0.7,
            }}
          >
            <Feather
              name="clock"
              size={14}
              color={darkMode ? "#bbb" : "#666"}
            />
            <Text
              style={{
                fontSize: 12,
                color: darkMode ? "#bbb" : "#666",
                marginLeft: 4,
              }}
            >
              {formattedDate || new Date().toLocaleDateString()}
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    card: {
      backgroundColor: "transparent",
      overflow: "hidden",
      // marginBottom: 20,
      borderRadius: 16,
    },
    image: {
      width: "100%",
      height: 200,
    },
    content: {
      padding: 15,
    },
    title: {
      fontSize: 17,
      fontWeight: "700",
      color: isDarkMode ? colors.textLight : colors.textDark,
      // lineHeight: 22,
    },
    description: {
      fontSize: 14,
      color: isDarkMode ? colors.textMutedLight : colors.textMutedDark,
      // marginVertical: 8,
      // marginBottom: 12,
      // lineHeight: 20,
    },
  });
};

export default NewsCard;
