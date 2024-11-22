import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import NewsCard from "../../components/NewsCard";
import { fetchCategoriesNews, searchNews } from "../../services/newsApi";
import { useTheme, AppContextType } from "../../NewsAppContext";
import { getStyles, colors } from "../../styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopUpMenu from "../../components/PopUpMenu";
import SkeletonLoader from "../../components/SkeletonLoader";
import { router } from "expo-router";
import { NewsItem } from "../../components/BookmarksNewsCard";

const CATEGORIES = [
  "local",
  "business",
  "technology",
  "sports",
  "entertainment",
  "health",
  "science",
];

const CategoriesScreen = () => {
  const [dataList, setDataList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('business');
  const {darkMode, toggleStorage} = useTheme() as AppContextType;
  const styles = getStyles(darkMode);
  const cacheDuration = 20 * 60 * 1000; // 20 minutes in milliseconds

  useEffect(() => {
    fetchNews();
  }, [selectedCategory, page]);

  const fetchNews = async () => {
    setLoading(true);

    // Generate a unique cache key for each category and page
    const cacheKey = `cachedNewsData_${selectedCategory}`;
    const cacheTimeKey = `cachedNewsTime_${selectedCategory}`;

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
          toggleStorage();

          setTimeout(async () => {
            await AsyncStorage.removeItem(cacheKey);
            await AsyncStorage.removeItem(cacheTimeKey);
            toggleStorage();
          }, cacheDuration);
        } else {
          setDataList([...dataList, ...articles]);
        }
      }
      setError("");
    } catch (error : any) {
      setError(error.message);
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

  const handleCategoryPress = (category: React.SetStateAction<string>) => {
    setSelectedCategory(category);
    setPage(1);
    setDataList([]);
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView
          style={[
            styles.categoryContainer,
            { paddingTop: Platform.OS === "android" ? 30 : 0 },
          ]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              activeOpacity={0.6}
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.activeCategoryButton,
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.activeCategoryText,
                ]}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>

      <View style={[styles.container, { paddingVertical: 0, paddingTop: 0 }]}>
        {loading && page === 1 ? (
          // Show skeleton loader while loading
          <>
            <SkeletonLoader darkMode={darkMode} />
            <SkeletonLoader darkMode={darkMode} />
            <SkeletonLoader darkMode={darkMode} />
          </>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataList}
            keyExtractor={(item) => item.url || item.title}
            renderItem={({ item }) => (
              <NewsCard
                item={item}
                onPress={() =>
                  router.navigate({
                    pathname: "/(CategoriesStack)/CategoriesArticle",
                    params: { url: item.url },
                  })
                }
              >
                <PopUpMenu item={item} add={true} remove={true} />
              </NewsCard>
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.3}
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListHeaderComponent={
              (error && <Text style={styles.errorText}>{error}</Text>) as any
            }
            ListEmptyComponent={
              <View
                style={{
                  // flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  top: 20,
                  width: "100%",
                  height: 700,
                }}
              >
                <Text
                  style={{
                    color: darkMode ? colors.bgLightColor : colors.bgDarkColor,
                    fontSize: 16,
                    marginBottom: 20,
                    textAlign: "center",
                    width: "80%",
                  }}
                >
                  No news articles were found for this category at this time.
                </Text>
              </View>
            }
            ListFooterComponent={
              <>
                {loading && <ActivityIndicator />}
                <View style={{ height: 46 }} />
              </>
            }
          />
        )}
      </View>
    </>
  );
};

export default CategoriesScreen;
