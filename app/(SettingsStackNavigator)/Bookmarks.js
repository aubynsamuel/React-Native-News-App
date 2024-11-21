import { View, FlatList, Text } from "react-native";
import { React, useState } from "react";
// import TopHeaderBar from "../../components/HeaderBar";
import { useTheme } from "../../NewsAppContext";
import BookmarksNewsCard from "../../components/BookmarksNewsCard";
import PopUpMenu from "../../components/PopUpMenu";
import { colors } from "../../styles";
import { router } from "expo-router";

const Bookmarks = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 300);
  };
  const { darkMode, bookmarksList } = useTheme();
  return (
    <View
      style={{
        backgroundColor: darkMode ? colors.bgDarkColor : colors.bgLightColor,
        flex: 1,
      }}
    >
      {/* <TopHeaderBar
        title={"Bookmarks"}
        backButtonShown={true}
        theme={darkMode}
      /> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={bookmarksList}
        keyExtractor={(item) => item.url || item.title}
        renderItem={({ item }) => (
          <BookmarksNewsCard
            item={item}
            onPress={() =>
              router.navigate({
                pathname: "/(SettingsStackNavigator)/BookmarksArticles",
                params: { url: item.url },
              })
            }
          >
            <PopUpMenu item={item} remove={true} />
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
              No bookmarks saved yet.
            </Text>
          </View>
        }
        ListFooterComponent={<View style={{ height: 50 }} />}
      />
    </View>
  );
};

export default Bookmarks;
