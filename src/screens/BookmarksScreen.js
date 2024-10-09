import {View, FlatList} from 'react-native';
import {React, useState} from 'react';
import TopHeaderBar from '../components/HeaderBar';
import { useTheme } from '../NewsAppContext';
import BookmarksNewsCard from '../components/BookmarksNewsCard';
import PopUpMenu from '../components/PopUpMenu';
import { colors } from '../styles';

const Bookmarks = ({navigation}) => {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(()=>setRefreshing(false), 300)
        
      };
    const {darkMode, bookmarksList} = useTheme()
  return (
    <View style={{backgroundColor: darkMode ? colors.bgDarkColor : colors.bgLightColor, flex: 1,}} >
      <TopHeaderBar title={'Bookmarks'} backButtonShown={true} theme={darkMode}/>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={bookmarksList}
        keyExtractor={item => item.url || item.title}
        renderItem={({item}) => (
          <BookmarksNewsCard
            item={item}
            onPress={() => navigation.navigate('BookmarksArticles', {url: item.url})}
          >
            <PopUpMenu item={item} remove={true}/>
          </BookmarksNewsCard>
        )}
        style={{marginVertical:5}}
        refreshing={refreshing}
        onRefresh={onRefresh}
        
        ListFooterComponent={<View style={{height:40}} />}
      />
    </View>
  );
};

export default Bookmarks;
