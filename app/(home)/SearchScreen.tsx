import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { searchNews } from "../../services/fetchNews";
import { useAppContext } from "../../context/AppContext";
import { colors } from "../../constants/colors";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { router } from "expo-router";
import { NewsItem } from "@/types/types";
import { openBrowser } from "@/utils/utils";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { darkMode } = useAppContext();
  const styles = getStyles(darkMode);

  // Fetch search results
  const handleSearch = async () => {
    if (!searchQuery) return;
    setLoading(true);
    setError("");
    try {
      const results = await searchNews(searchQuery, 1);
      setSearchResults(results);
    } catch {
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: NewsItem }) => (
    <TouchableOpacity
      style={styles.titleContainer}
      onPress={() => openBrowser(item.url)}
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
            returnKeyType={"search"}
          />
          <TouchableOpacity onPress={() => setSearchQuery("")}>
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
        contentContainerStyle={{ paddingHorizontal: 8 }}
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

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    titleContainer: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      paddingHorizontal: 15,
      borderBottomColor: isDarkMode
        ? "rgba(255,255,255,0.1)"
        : "rgba(0,0,0,0.05)",
    },
    titleText: {
      fontSize: 16,
      color: isDarkMode ? colors.textLight : colors.textDark,
      fontWeight: "500",
    },
    errorText: {
      color: colors.error,
      textAlign: "center",
      fontSize: 15,
    },
    noResultsText: {
      textAlign: "center",
      marginTop: 25,
      color: isDarkMode ? colors.textLight : colors.textDark,
      fontSize: 16,
    },
    loadingIndicator: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: [{ translateX: -12.5 }, { translateY: -12.5 }],
    },
    cancelSearch: {
      flex: 1,
      alignSelf: "center",
      justifyContent: "center",
      marginRight: 10,
    },
    SearchScreenSearchBar: {
      height: 45,
      flex: 6.5,
      alignSelf: "center",
      backgroundColor: isDarkMode
        ? colors.bgDarkSecondary
        : colors.bgLightColor,
      borderWidth: 0,
      borderRadius: 12,
      paddingHorizontal: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: 10,
      shadowColor: isDarkMode ? "#000" : "#888",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 5,
      elevation: 3,
    },

    container: {
      flex: 1,
      backgroundColor: isDarkMode
        ? colors.bgDarkColor
        : colors.bgLightSecondary,
      paddingTop: 24,
    },
    searchInput: {
      flex: 1,
      padding: 10,
      borderRadius: 5,
      color: isDarkMode ? colors.textLight : colors.accent,
      fontSize: 16,
    },
  });
};

export default SearchScreen;
