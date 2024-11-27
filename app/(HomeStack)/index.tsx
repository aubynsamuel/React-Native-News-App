import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchNewsData } from "../../services/newsApi";
import NewsCard from "../../components/NewsCard";
import { useTheme, AppContextType } from "../../NewsAppContext";
import getStyles from "../../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PopUpMenu from "../../components/PopUpMenu";
import SkeletonLoader from "../../components/SkeletonLoader";
import { router } from "expo-router";
import { NewsItem } from "@/components/BookmarksNewsCard";

const HomeScreen = () => {
  const [dataList, setDataList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(String);
  const { darkMode, toggleStorage } = useTheme() as AppContextType;
  const styles = getStyles(darkMode);
  const cacheDuration = 20 * 60 * 1000;
  const cacheKey = `cachedNewsData`;
  const cacheTimeKey = `cachedNewsTime`;

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
    } catch (error: any) {
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

  // const handleSearchPress = () => {
  //   router.navigate("/(HomeStack)/SearchScreen");
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchableOpacity
        style={styles.HomeSearchBar}
        onPress={handleSearchPress}
        activeOpacity={0.5}>
        <Text style={styles.searchText}>Search News</Text>
        <Icon name="search" style={styles.searchIcon} size={25} />
      </TouchableOpacity> */}
      {/* <Text style={styles.TopHeadlines}>Top Headlines</Text> */}

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
                  pathname: "/(HomeStack)/Article",
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
          ListFooterComponent={
            <>
              {loading && <ActivityIndicator />}
              <View style={{ height: 46 }} />
            </>
          }
          ListHeaderComponent={
            (error && <Text style={styles.errorText}>{error}</Text>) as any
          }
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: 700,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: darkMode ? "#fff" : "#333",
                }}
              >
                No news available
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 10,
                  color: darkMode ? "#fff9" : "#666",
                }}
              >
                Please try again later
              </Text>

              <TouchableOpacity
                style={{
                  backgroundColor: darkMode ? "#000" : "#fff",
                  padding: 15,
                  borderRadius: 5,
                  marginTop: 20,
                }}
                onPress={onRefresh}
              >
                <Text style={{ color: darkMode ? "#fff" : "#000" }}>Retry</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
