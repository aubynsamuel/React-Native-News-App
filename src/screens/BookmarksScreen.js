import {View, Text, FlatList} from 'react-native';
import {React, useState} from 'react';
import TopHeaderBar from '../components/HeaderBar';
import { useTheme } from '../ThemeContext';
import NewsCard from '../components/BookmarksNewsCard';
import PopUpMenu from '../components/PopUpMenu';

const Bookmarks = ({navigation}) => {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
      };
    const {bookmarksList} = useTheme()
  return (
    <View>
      <TopHeaderBar title={'Bookmarks'} backButtonShown={true}/>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={bookmarksList}
        keyExtractor={item => item.url || item.title}
        renderItem={({item}) => (
          <NewsCard
            item={item}
            onPress={() => navigation.navigate('BookmarksArticles', {url: item.url})}
          >
            <PopUpMenu item={item}/>
          </NewsCard>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        // ListFooterComponent={loading && <ActivityIndicator />}
      />
    </View>
  );
};

export default Bookmarks;
