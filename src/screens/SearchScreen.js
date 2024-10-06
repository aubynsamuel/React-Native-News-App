import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {searchNews} from '../services/newsApi';
import {useTheme} from '../ThemeContext';
import {getStyles, colors} from '../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {darkMode} = useTheme();
  const styles = getStyles(darkMode);

  // Fetch search results
  const handleSearch = async () => {
    if (!searchQuery) return;
    setLoading(true);
    setError(null);
    try {
      const results = await searchNews(searchQuery);
      setSearchResults(results);
    } catch (error) {
      setError('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render each news title
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.titleContainer}
      onPress={() => navigation.navigate('Article', {url: item.url})}
      activeOpacity={0.6}>
      <Text style={styles.titleText} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for news..."
          placeholderTextColor={darkMode ? colors.bgLightColor : colors.accent}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          onSubmitEditing={handleSearch}
          autoCorrect={false}
        />
        <TouchableOpacity
          onPress={() => setSearchQuery('')}
          style={styles.searchButton}>
          {searchQuery && (
            <Icon
              name="clear"
              color={darkMode ? colors.bgLightColor : colors.bgDarkColor}
              size={24}
            />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.cancelSearch}
        onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={{color: darkMode ? colors.bgLightColor : colors.accent}}>
          Cancel
        </Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {loading && <ActivityIndicator style={styles.loadingIndicator} />}

      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={item => item.url || item.title}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <>
            {!error && (
              <Text style={styles.noResultsText}>No results found</Text>
            )}
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
