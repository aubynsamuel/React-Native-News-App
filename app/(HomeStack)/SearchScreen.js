import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { searchNews } from "../../services/newsApi";
import { useTheme } from "../../NewsAppContext";
import { getStyles, colors } from "../../styles";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { router } from "expo-router";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();
  const styles = getStyles(darkMode);

  // Fetch search results
  const handleSearch = async () => {
    if (!searchQuery) return;
    setLoading(true);
    setError(null);
    try {
      const results = await searchNews(searchQuery, 1);
      setSearchResults(results);
    } catch (error) {
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Render each news title
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.titleContainer}
      onPress={() =>
        router.navigate({
          pathname: "/(HomeStack)/Article",
          params: { url: item.url },
        })
      }
      activeOpacity={0.6}
    >
      <Text style={styles.titleText} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: 35 }]}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
        }}
      >
        <View style={styles.SearchScreenSearchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for news..."
            placeholderTextColor={
              darkMode ? colors.bgLightColor : colors.accent
            }
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
            autoCorrect={false}
          />
          <TouchableOpacity
            onPress={() => setSearchQuery("")}
            style={styles.searchButton}
          >
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
          onPress={() => router.navigate("..")}
        >
          <Text
            style={{ color: darkMode ? colors.bgLightColor : colors.accent }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {loading && <ActivityIndicator style={styles.loadingIndicator} />}

      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.url || item.title}
        contentContainerStyle={{paddingHorizontal:8}}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 65 }} />}
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
