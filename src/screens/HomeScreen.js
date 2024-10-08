import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import {fetchNewsData} from '../services/newsApi';
import NewsCard from '../components/NewsCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../ThemeContext';
import getStyles from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {lists} from '../../list';
import PopUpMenu from '../components/PopUpMenu';

const HomeScreen = ({navigation}) => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const {darkMode, addToBookmarks, removeFromBookmarks} = useTheme();
  const styles = getStyles(darkMode);
  const cacheDuration = 20 * 60 * 1000;
  const cacheKey = 'cachedNewsData';
  const cacheTimeKey = 'cachedNewsTime';

  useEffect(() => {
    fetchNews();
  }, [page]);

  const fetchNews = async () => {
    setLoading(true);

    try {
      // Check for cached data
      const cachedData = await AsyncStorage.getItem(cacheKey);
      const cachedTime = await AsyncStorage.getItem(cacheTimeKey);
      const now = new Date().getTime();

      if (
        cachedData &&
        cachedTime &&
        now - cachedTime < cacheDuration &&
        page === 1
      ) {
        // If cache is valid, use cached data
        console.log('Using cached data');
        const articles = JSON.parse(cachedData);
        setDataList(articles);
      } else {
        // Fetch new data
        const articles = await fetchNewsData(page);
        if (page === 1) {
          setDataList(articles);

          // Store new data and cache time
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
      // Ensure more data exists
      setPage(page + 1);
    }
  };

  const handleSearchPress = () => {
    navigation.navigate('SearchScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.SearchBAR}
        onPress={handleSearchPress}
        activeOpacity={0.5}>
        <Text style={styles.searchText}>Search News</Text>
        <Icon name="search" style={styles.searchIcon} size={25} />
      </TouchableOpacity>
      <Text style={styles.TopHeadlines}>Top Headlines</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataList}
        // data={lists}
        keyExtractor={item => item.url || item.title}
        renderItem={({item}) => (
          <NewsCard
            item={item}
            onPress={() => navigation.navigate('Article', {url: item.url})}>
            <PopUpMenu item={item} />
          </NewsCard>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListFooterComponent={loading && <ActivityIndicator />}
      />
      {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
    </SafeAreaView>
  );
};

export default HomeScreen;
