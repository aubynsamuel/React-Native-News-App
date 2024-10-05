import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import NewsCard from '../components/NewsCard';
import {fetchCategoriesNews} from '../services/newsApi';
import {useTheme} from '../ThemeContext';
import getStyles from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CATEGORIES = [
  'business',
  'technology',
  'sports',
  'entertainment',
  'health',
  'science',
];

const CategoriesScreen = ({navigation}) => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('business');
  const {darkMode} = useTheme();
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
        now - cachedTime < cacheDuration &&
        page === 1
      ) {
        // If cache is valid and it's the first page, use cached data
        console.log('Using cached data for category:', selectedCategory);
        const articles = JSON.parse(cachedData);
        setDataList(articles);
      } else {
        // Fetch new data
        const articles = await fetchCategoriesNews(page, selectedCategory);
        if (page === 1) {
          setDataList(articles);

          // Store the new data and cache time
          await AsyncStorage.setItem(cacheKey, JSON.stringify(articles));
          await AsyncStorage.setItem(cacheTimeKey, now.toString());
        } else {
          setDataList([...dataList, ...articles]);
        }
      }
    } catch (error) {
      console.log(error);
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

  const handleCategoryPress = category => {
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
            {paddingTop: Platform.OS === 'android' ? 5 : 0},
          ]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.activeCategoryButton, 
              ]}
              onPress={() => handleCategoryPress(category)}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.activeCategoryText,
                ]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}{' '}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>

      <View style={[styles.container, {paddingVertical: 0, paddingTop: 0}]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataList}
          keyExtractor={item => item.url || item.title}
          renderItem={({item}) => (
            <NewsCard
              item={item}
              onPress={() =>
                navigation.navigate('CategoriesArticle', {url: item.url})
              }
              theme={darkMode}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListFooterComponent={loading && <ActivityIndicator />}
        />

        {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
      </View>
    </>
  );
};

export default CategoriesScreen;
