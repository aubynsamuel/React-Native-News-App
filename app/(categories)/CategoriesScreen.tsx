import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  StatusBar,
  RefreshControl,
  Animated,
  useWindowDimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import NewsCard from "../../components/NewsCard";
import { fetchCategoriesNews, searchNews } from "../../services/fetchNews";
import { useAppContext } from "../../context/AppContext";
import { colors } from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PopUpMenu from "../../components/PopUpMenu";
import SkeletonLoader from "../../components/SkeletonLoader";
import { NewsItem } from "@/types/types";
import { openBrowser } from "@/utils/utils";

export interface CategoryItem {
  id: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

const CATEGORIES: CategoryItem[] = [
  { id: "local", icon: "location-on" },
  { id: "business", icon: "business" },
  { id: "technology", icon: "devices" },
  { id: "sports", icon: "sports-basketball" },
  { id: "entertainment", icon: "theater-comedy" },
  { id: "health", icon: "health-and-safety" },
  { id: "science", icon: "science" },
];

const CACHE_DURATION = 20 * 60 * 1000;

const CategoriesScreen = () => {
  const [dataList, setDataList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("business");
  const { darkMode } = useAppContext();
  const styles = getStyles(darkMode);
  const { height } = useWindowDimensions();

  const getCacheKey = (category: string) => `cachedNewsData_${category}`;
  const getCacheTimeKey = (category: string) => `cachedNewsTime_${category}`;

  useEffect(() => {
    fetchNews();
  }, [selectedCategory, page]);

  const fetchNews = async () => {
    if (loading && !refreshing) return;
    setLoading(true);

    const cacheKey = getCacheKey(selectedCategory);
    const cacheTimeKey = getCacheTimeKey(selectedCategory);

    try {
      const cachedData = await AsyncStorage.getItem(cacheKey);
      const cachedTime = await AsyncStorage.getItem(cacheTimeKey);
      const now = new Date().getTime();

      if (
        cachedData &&
        cachedTime &&
        now - parseInt(cachedTime) < CACHE_DURATION &&
        page === 1
      ) {
        // If cache is valid and it's the first page, use cached data
        const articles = JSON.parse(cachedData);
        setDataList(articles);
      } else {
        // Fetch new data
        const localNewsTerms = "ghanaian";
        const articles =
          selectedCategory === "local"
            ? await searchNews(localNewsTerms, page)
            : await fetchCategoriesNews(page, selectedCategory);

        if (page === 1) {
          setDataList(articles);

          // Store the new data and cache time
          await AsyncStorage.setItem(cacheKey, JSON.stringify(articles));
          await AsyncStorage.setItem(cacheTimeKey, now.toString());

          // Set cache expiration
          setTimeout(async () => {
            await AsyncStorage.removeItem(cacheKey);
            await AsyncStorage.removeItem(cacheTimeKey);
          }, CACHE_DURATION);
        } else {
          setDataList((prevData) => [...prevData, ...articles]);
        }
      }
      setError("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setPage(1);
    setRefreshing(true);
    fetchNews();
  }, [selectedCategory]);

  const handleLoadMore = useCallback(() => {
    if (!loading && dataList.length >= page * 15) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, dataList.length, page]);

  const handleCategoryPress = useCallback((category: string) => {
    setSelectedCategory(category);
    setPage(1);
    setDataList([]);
  }, []);

  const renderCategoryItem = useCallback(
    ({ item }: { item: CategoryItem }) => (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.categoryButton,
          selectedCategory === item.id && styles.activeCategoryButton,
        ]}
        onPress={() => handleCategoryPress(item.id)}
      >
        <MaterialIcons
          name={item.icon}
          size={20}
          color={getIconColor(selectedCategory === item.id, darkMode)}
          style={styles.categoryIcon}
        />
        <Text
          style={[
            styles.categoryText,
            selectedCategory === item.id && styles.activeCategoryText,
          ]}
        >
          {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
        </Text>
      </TouchableOpacity>
    ),
    [selectedCategory, darkMode]
  );

  const renderNewsItem = useCallback(
    ({ item }: { item: NewsItem }) => (
      <Animated.View
        style={{
          opacity: 1,
          transform: [{ scale: 1 }],
        }}
      >
        <NewsCard item={item} onPress={() => openBrowser(item.url)}>
          <PopUpMenu item={item} add={true} remove={true} />
        </NewsCard>
      </Animated.View>
    ),
    [darkMode]
  );

  const renderEmptyState = () => (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
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
      <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
        <Text style={styles.retryButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.rootContainer}>
      {/* Animated header background */}

      {/* Categories tabs */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.categoryContainer}>
          <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          />
        </View>
      </SafeAreaView>

      {/* Main content */}
      <View style={{ flex: 1 }}>
        {loading && page === 1 && !refreshing ? (
          <View style={styles.skeletonContainer}>
            {[1, 2, 3].map((idx) => (
              <SkeletonLoader key={idx} darkMode={darkMode} />
            ))}
          </View>
        ) : (
          <Animated.FlatList
            showsVerticalScrollIndicator={false}
            data={dataList}
            keyExtractor={(item) =>
              item.url || item.title || Math.random().toString()
            }
            renderItem={renderNewsItem}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[colors.accent]}
                tintColor={darkMode ? colors.textMutedLight : colors.accent}
                progressBackgroundColor={
                  darkMode ? colors.bgDarkSecondary : colors.bgLightColor
                }
              />
            }
            ListEmptyComponent={!loading ? renderEmptyState() : null}
            ListFooterComponent={
              <>
                {loading && page > 1 && (
                  <View style={styles.footerLoader}>
                    <ActivityIndicator color={colors.accent} size="small" />
                    <Text style={styles.loadingMoreText}>
                      Loading more articles...
                    </Text>
                  </View>
                )}
                <View style={{ height: 80 }} />
              </>
            }
          />
        )}
      </View>
    </View>
  );
};

const getIconColor = (isSelected: boolean, isDarkMode: boolean) => {
  if (isSelected) {
    return isDarkMode ? "#fec0f4" : colors.accent;
  } else {
    return isDarkMode ? colors.textMutedLight : colors.textDark;
  }
};

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: isDarkMode
        ? colors.bgDarkColor
        : colors.bgLightSecondary,
    },
    safeArea: {
      backgroundColor: "transparent",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      zIndex: 10,
    },
    headerBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: Platform.OS === "android" ? 100 : 90,
      backgroundColor: isDarkMode
        ? "rgba(18, 18, 18, 1)"
        : "rgba(250, 250, 250, 1)",
      zIndex: 5,
    },
    categoryContainer: {
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode
        ? "rgba(255,255,255,0.1)"
        : "rgba(0,0,0,0.05)",
    },
    categoryList: {
      paddingHorizontal: 10,
    },
    categoryButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 15,
      marginHorizontal: 4,
      borderRadius: 12,
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.08)"
        : "rgba(0,0,0,0.04)",
    },
    activeCategoryButton: {
      backgroundColor: isDarkMode
        ? "rgba(0,122,255,0.15)"
        : "rgba(0,122,255,0.1)",
    },
    categoryIcon: {
      marginRight: 6,
    },
    categoryText: {
      color: isDarkMode ? colors.textMutedLight : colors.textDark,
      fontWeight: "600",
      fontSize: 14,
    },
    activeCategoryText: {
      color: isDarkMode ? "#fec0f4" : colors.accent,
      fontWeight: "700",
    },
    activeIndicator: {
      position: "absolute",
      bottom: 0,
      height: 3,
      borderRadius: 3,
      backgroundColor: colors.accent,
    },
    skeletonContainer: {
      paddingHorizontal: 15,
      marginTop: 10,
    },
    errorText: {
      color: colors.error,
      textAlign: "center",
      fontSize: 15,
      marginVertical: 20,
      backgroundColor: isDarkMode ? "rgba(255,0,0,0.1)" : "rgba(255,0,0,0.05)",
      padding: 15,
      borderRadius: 8,
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      height: "100%",
      width: "100%",
      backgroundColor: "red",
    },
    emptyText: {
      color: isDarkMode ? colors.textMutedLight : colors.textDark,
      fontSize: 16,
      textAlign: "center",
      marginTop: 16,
      marginBottom: 20,
      lineHeight: 22,
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
    footerLoader: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 16,
    },
    loadingMoreText: {
      marginLeft: 10,
      color: isDarkMode ? colors.textMutedLight : colors.textMutedDark,
      fontSize: 14,
    },
  });
};

export default CategoriesScreen;
