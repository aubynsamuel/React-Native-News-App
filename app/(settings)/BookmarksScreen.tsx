import { View, FlatList, Text } from "react-native";
import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import BookmarksNewsCard from "../../components/BookmarksNewsCard";
import PopUpMenu from "../../components/PopUpMenu";
import { colors } from "../../constants/colors";
import { openBrowser } from "@/utils/utils";

const Bookmarks = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 300);
  };
  const { darkMode, bookmarksList } = useAppContext();
  return (
    <View
      style={{
        backgroundColor: darkMode
          ? colors.bgDarkColor
          : colors.bgLightSecondary,
        flex: 1,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={bookmarksList}
        keyExtractor={(item) => item.url || item.title}
        renderItem={({ item }) => (
          <BookmarksNewsCard item={item} onPress={() => openBrowser(item.url)}>
            <PopUpMenu item={item} remove={true} add={false} />
          </BookmarksNewsCard>
        )}
        style={{ marginVertical: 5 }}
        refreshing={refreshing}
        onRefresh={onRefresh}
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
                color: darkMode ? colors.bgLightColor : colors.bgDarkColor,
                fontSize: 16,
              }}
            >
              No bookmarked articles.
            </Text>
          </View>
        }
        ListFooterComponent={<View style={{ height: 50 }} />}
      />
    </View>
  );
};

export default Bookmarks;
