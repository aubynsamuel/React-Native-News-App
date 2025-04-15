import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { fetchNewsData } from "../../services/fetchNews";
import NewsCard from "../../components/NewsCard";
import { useAppContext } from "../../context/AppContext";
import { colors } from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PopUpMenu from "../../components/PopUpMenu";
import SkeletonLoader from "../../components/SkeletonLoader";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { NewsItem } from "@/types/types";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const HomeScreen = () => {
  const [dataList, setDataList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(String);
  const { darkMode } = useAppContext();
  const styles = getStyles(darkMode);
  const cacheDuration = 20 * 60 * 1000;
  const cacheKey = `cachedNewsData`;
  const cacheTimeKey = `cachedNewsTime`;
  const { height } = useWindowDimensions();
  const scrollY = useSharedValue(0);

  const headerStyles = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, 200], [40, 0], Extrapolation.CLAMP),
    opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolation.CLAMP),
  }));

  useEffect(() => {
    fetchNews();
  }, [page]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const cachedData = await AsyncStorage.getItem(cacheKey);
      const cachedTime = await AsyncStorage.getItem(cacheTimeKey);
      const now = new Date().getTime();

      if (
        cachedData &&
        cachedTime &&
        now - parseInt(cachedTime) < cacheDuration &&
        page === 1
      ) {
        const articles = JSON.parse(cachedData);
        setDataList(articles);
      } else {
        // Fetch new data
        const articles = await fetchNewsData(page);
        if (page === 1) {
          setDataList(articles);
          await AsyncStorage.setItem(cacheKey, JSON.stringify(articles));
          await AsyncStorage.setItem(cacheTimeKey, JSON.stringify(now));

          setTimeout(async () => {
            await AsyncStorage.removeItem(cacheKey);
            await AsyncStorage.removeItem(cacheTimeKey);
          }, cacheDuration);
        } else {
          setDataList([...dataList, ...articles]);
        }
      }
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setPage(1);
    setRefreshing(true);
    fetchNews();
  };

  const handleLoadMore = () => {
    if (!loading && dataList.length >= page * 15) {
      setPage(page + 1);
    }
  };

  const renderFeaturedHeader = () => (
    <Animated.View
      style={[
        headerStyles,
        {
          paddingHorizontal: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 40,
        },
      ]}
    >
      <View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "800",
            color: darkMode ? "#ffffff" : "#222222",
            paddingLeft: 5,
          }}
        >
          Top Headlines
        </Text>
      </View>
      <View>
        <TouchableOpacity activeOpacity={0.5} onPress={() => router.navigate}>
          <MaterialIcons
            onPress={() => router.navigate("/(home)/SearchScreen")}
            name={"search"}
            size={24}
            color={darkMode ? "white" : colors.accent}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderFeaturedHeader()}
      {loading && page === 1 ? (
        // Show skeleton loader while loading
        <>
          <SkeletonLoader darkMode={darkMode} />
          <SkeletonLoader darkMode={darkMode} />
          <SkeletonLoader darkMode={darkMode} />
        </>
      ) : (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataList}
            keyExtractor={(item) => item.url || item.title}
            renderItem={({ item }) => (
              <NewsCard
                item={item}
                onPress={() =>
                  router.navigate({
                    pathname: "/(home)/Article",
                    params: { url: item.url },
                  })
                }
              >
                <PopUpMenu item={item} add={true} remove={true} />
              </NewsCard>
            )}
            onScroll={(event) => {
              scrollY.value = event.nativeEvent.contentOffset.y;
            }}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.3}
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListFooterComponent={
              <>
                {loading && (
                  <ActivityIndicator size="large" color={colors.accent} />
                )}
                <View style={{ height: 80 }} />
              </>
            }
            ListEmptyComponent={
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 20,
                  height: height * 0.8,
                  width: "100%",
                }}
              >
                <MaterialIcons
                  name="error"
                  size={50}
                  color={darkMode ? colors.textMutedLight : colors.bgDarkColor}
                  style={{ marginBottom: 15 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: darkMode ? "#fff" : "#333",
                  }}
                >
                  {error === "Network request failed"
                    ? "No internet Connection"
                    : "No news available"}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 3,
                    color: darkMode ? "#fff9" : "#666",
                  }}
                >
                  {error === "Network request failed"
                    ? "Connect to the internet and try again"
                    : "Please try again later"}
                </Text>

                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={onRefresh}
                >
                  <Text style={styles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </>
      )}
    </SafeAreaView>
  );
};

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode
        ? colors.bgDarkColor
        : colors.bgLightSecondary,
      paddingTop: 24,
    },
    TopHeadlines: {
      fontSize: 28,
      fontWeight: "800",
      marginBottom: 5,
      marginLeft: 15,
      color: isDarkMode ? colors.textLight : colors.textDark,
    },
    SubHeadline: {
      fontSize: 14,
      marginBottom: 15,
      marginLeft: 15,
      color: isDarkMode ? colors.textMutedLight : colors.textMutedDark,
    },
    errorText: {
      color: colors.error,
      textAlign: "center",
      fontSize: 15,
    },
    retryButton: {
      backgroundColor: colors.accent,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
      marginTop: 10,
    },
    retryButtonText: {
      color: colors.textLight,
      fontWeight: "600",
    },
  });
};

export default HomeScreen;
