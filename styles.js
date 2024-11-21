import { StyleSheet, Platform } from "react-native";

export const colors={
  bgDarkColor:"#000",
  bgLightColor:"#fff",
  accent:"purple"
}

export const getStyles = (isDarkMode) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      // padding: 0.1,
      // paddingVertical: 0,
      backgroundColor: isDarkMode ? colors.bgDarkColor : colors.bgLightColor, 
      // paddingTop: Platform.OS === "android" ? 5 : 0,
    },

    // Search bar (HomeScreen.js)
    HomeSearchBar: {
      height: 38,
      width: "95%",
      backgroundColor: isDarkMode ? "#555" : "#d1d1d1d1",
      alignSelf: "center",
      marginBottom: 10,
      borderWidth: 0,
      borderRadius: 25,
      paddingHorizontal: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 1,
    },
    searchText: {
      fontSize: 16,
      color: isDarkMode ? "#bbb" : colors.accent, 
      flex: 1,
    },
    searchIcon: {
      alignSelf: "center",
      color: isDarkMode ? "#bbb" : colors.accent, 
    },

    // HomeScreen.js
    TopHeadlines: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
      marginLeft: 10,
      color: isDarkMode ? colors.bgLightColor : colors.bgDarkColor,
    },

    // CategoriesScreen
    categoryContainer: {
      flexDirection: "row",
      paddingVertical: 10,
      backgroundColor: isDarkMode ? colors.bgDarkColor : colors.bgLightColor,
    },
    categoryButton: {
      padding: 10,
      marginHorizontal: 5,
      borderRadius: 20,
      backgroundColor: isDarkMode ? "#333" : "#e0e0e0",
    },
    activeCategoryButton: {
      backgroundColor: colors.accent,
    },
    categoryText: {
      color: isDarkMode ? "#bbb" : colors.bgDarkColor,
      fontWeight: "bold",
    },
    activeCategoryText: {
      color: colors.bgLightColor,
    },

    // Search bar and search results (SearchScreen.js)
    SearchScreenSearchBar: {
      height: 38,
      width: "90%",
      flex:6.5,
      alignSelf: "center",
      backgroundColor: isDarkMode ? "#fff8" : "#d1d1d1d1",
      borderWidth: 0,
      borderRadius: 25,
      paddingHorizontal: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: 10,
    },
    searchInput: {
      flex: 1,
      padding: 10,
      borderRadius: 5,
      color:isDarkMode?"white":colors.accent
    },
    searchButton: {
      marginLeft: 10,
      padding: 10,
    },
    cancelSearch: {
      flex:1,
      alignSelf:"center",
      justifyContent: "center",
      marginRight: 10,
    },
    // Search results (SearchScreen)
    titleContainer: {
      paddingVertical: 8,
      borderBottomWidth: 1,
      paddingHorizontal:4,
      borderBottomColor: isDarkMode ? "#333333" : "#e0e0e0",
    },
    titleText: {
      fontSize: 16,
      color: isDarkMode ? colors.bgLightColor : colors.bgDarkColor,
    },
    errorText: {
      color: "#ff5252",
      textAlign: "center",
      // marginTop: 70,
    },
    loadingIndicator: {
      marginTop: 20,
    },
    noResultsText: {
      textAlign: "center",
      marginTop: 18,
      color: isDarkMode ? colors.bgLightColor : colors.bgDarkColor,
    },

    // Custom Header Bar (HeaderBar.js)
    headerContainer: {
      flexDirection: "row", 
      alignItems: "center", 
      padding: 10,
      backgroundColor: isDarkMode?colors.bgDarkColor : colors.bgLightColor,
      elevation: 3, 
      height: 45,
      borderBottomWidth:1.5,
      borderBottomColor :isDarkMode?"grey":"#0003",
      paddingTop: Platform.OS === "android" ? 5 : 0,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "500",
      marginHorizontal: 10,
      color: isDarkMode?colors.bgLightColor:colors.accent
    },
    headerBarIcon:{
      color: isDarkMode ? colors.bgLightColor : colors.accent, 
      marginHorizontal:10
    },
    settingsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      // borderBottomWidth: 1,
      // borderBottomColor: isDarkMode ? "#444" : "#ccc",
      backgroundColor: isDarkMode ? colors.bgDarkColor : colors.bgLightColor,
    },
    settingsOption: {
      padding: 10,
      // borderBottomWidth: 1,
      // borderBottomColor: isDarkMode ? "#444" : "#ccc",
      backgroundColor: isDarkMode ? colors.bgDarkColor : colors.bgLightColor,
    },
    settingsText: {
      fontSize: 16,
      color: isDarkMode ? colors.bgLightColor : colors.bgDarkColor,
    },
    settingsButton: {
      marginTop: 8,
      padding: 10,
      backgroundColor: isDarkMode ? "#fff9" : "grey",
      borderRadius: 5,
      alignItems: "center",
    },

    // Custom News Card Component
    card: {
      backgroundColor: "transparent",
      overflow: "hidden",
      marginBottom: 15,
    },
    image: {
      width: "100%",
      height: 200,
    },
    content: {
      padding: 5,
    },
    title: {
      fontSize: 15,
      fontWeight: "bold",
      color:isDarkMode? colors.bgLightColor: "#333",
    },
    description: {
      fontSize: 13,
      color: isDarkMode?"#fff9":"#666",
      marginVertical:5,
      marginBottom: 10,
      width: '90%'
    },
    loadingIndicator: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -12.5 }, { translateY: -12.5 }],
    },
    // Pop up menu icon
    moreVert:{
      zIndex:3,
    }
  });
};

export default getStyles;
