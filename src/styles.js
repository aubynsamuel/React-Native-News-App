import { StyleSheet, Platform } from "react-native";

export const getStyles = (isDarkMode) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 0.1,
      paddingVertical: 0,
      backgroundColor: isDarkMode ? "#121212" : "#f9f9f9", // Dark mode background
      paddingTop: Platform.OS === "android" ? 5 : 0,
    },
    resultsList: {
      paddingHorizontal: 10,
      elevation: 5,
      maxHeight: 650,
      backgroundColor: isDarkMode ? "#1c1c1c" : "#fff", // Dark mode for cards
      borderRadius: 8,
    },
    resultItem: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? "#444" : "#ccc",
    },
    resultText: {
      fontSize: 14,
      color: isDarkMode ? "#e0e0e0" : "#000", // Dark mode text color
    },
    SearchBAR: {
      height: 45,
      width: "95%",
      backgroundColor: isDarkMode ? "#555" : "#d1d1d1d1",
      alignSelf: "center",
      marginBottom: 10,
      borderWidth: 0,
      borderRadius: 25,
      paddingHorizontal: 10,
      // marginHorizontal:10,
      flexDirection: "row",
      // display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 1,
    },
    searchText: {
      fontSize: 16,
      color: isDarkMode ? "#bbb" : "purple", // Change search text color
      flex: 1,
      // top: 10,
    },
    headerBarIcon:{
      color: isDarkMode ? "#fff" : "purple", // Search icon color in dark mode
    },
    searchIcon: {
      alignSelf: "center",
      color: isDarkMode ? "#bbb" : "purple", // Search icon color in dark mode
    },
    TopHeadlines: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
      marginLeft: 10,
      color: isDarkMode ? "#fff" : "#000", // Dark mode for headlines
    },
    categoryContainer: {
      flexDirection: "row",
      paddingVertical: 10,
      backgroundColor: isDarkMode ? "#121212" : "#f9f9f9",
    },
    categoryButton: {
      padding: 10,
      marginHorizontal: 5,
      // marginBottom: 5,
      borderRadius: 20,
      backgroundColor: isDarkMode ? "#333" : "#e0e0e0",
    },
    activeCategoryButton: {
      backgroundColor: "purple",
    },
    categoryText: {
      color: isDarkMode ? "#bbb" : "#000",
      fontWeight: "bold",
    },
    activeCategoryText: {
      color: "#fff",
    },
    errorText: {
      color: "red",
      textAlign: "center",
      marginTop: 20,
    },
    card: {
      backgroundColor: isDarkMode ? "#1c1c1c" : "#fff",
      borderRadius: 20,
      marginBottom: 15,
      overflow: "hidden",
      flexDirection: "row",
      height: 150,
      backgroundColor: isDarkMode ? "#333" : "#d1d1d1d1",
    },
    cardImage: {
      width: "50%",
      height: "80%",
      alignSelf: "center",
      marginLeft: 8,
      borderColor: "transparent",
      borderWidth: 5,
      borderRadius: 15,
    },
    cardText: {
      padding: 7,
      flex: 1,
      justifyContent: "center",
      alignSelf: "center",
      color: isDarkMode ? "#e0e0e0" : "#000", // Text color for dark mode
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDarkMode ? "#fff" : "#000",
    },
    cardDescription: {
      fontSize: 14,
      color: isDarkMode ? "#bbb" : "#666",
      marginVertical: 5,
    },
    searchBarContainer: {
      height: 45,
      width: "82%",
      backgroundColor: isDarkMode ? "#fff8" : "#d1d1d1d1",
      // alignSelf: "center",
      // marginBottom: 10,
      borderWidth: 0,
      borderRadius: 25,
      paddingHorizontal: 5,
      marginLeft: 7,
      // marginHorizontal:10,
      flexDirection: "row",
      // display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    searchInput: {
      flex: 1,
      padding: 10,
      borderRadius: 5,
      color:isDarkMode?"black":"purple"
    },
    searchButton: {
      marginLeft: 10,
      padding: 10,
    },
    cancelSearch: {
      alignSelf: "flex-end",
      position: "absolute",
      top: 20,
      right: 12,
    },
    titleContainer: {
      paddingVertical: 8,
      borderBottomWidth: 1,
      paddingHorizontal:4,
      borderBottomColor: isDarkMode ? "#333333" : "#e0e0e0",
    },
    titleText: {
      fontSize: 16,
      color: isDarkMode ? "#ffffff" : "#000000",
    },
    errorText: {
      color: "#ff5252",
      textAlign: "center",
      marginTop: 20,
    },
    loadingIndicator: {
      marginTop: 20,
    },
    noResultsText: {
      textAlign: "center",
      marginTop: 20,
      color: isDarkMode ? "#ffffff" : "#000000",
    },
    headerContainer: {
      flexDirection: "row", 
      alignItems: "center", 
      padding: 10,
      backgroundColor: isDarkMode?"#121212" : "#f9f9f9",
      elevation: 3, 
      height: 45,
      borderBottomWidth:1.5,
      borderBottomColor :"#0003",
      paddingTop: Platform.OS === "android" ? 5 : 0,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "500",
      marginHorizontal: 10,
      color: isDarkMode?"#fff":"purple"
    },
    headerBackButton: {
      // marginHorizontal:5
    },
    settingsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? "#444" : "#ccc",
      backgroundColor: isDarkMode ? "#333" : "#fff",
    },
    settingsOption: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? "#444" : "#ccc",
      backgroundColor: isDarkMode ? "#333" : "#fff",
    },
    settingsText: {
      fontSize: 16,
      color: isDarkMode ? "#fff" : "#000",
    },
    settingsButton: {
      marginTop: 8,
      padding: 10,
      backgroundColor: isDarkMode ? "#fff9" : "grey",
      borderRadius: 5,
      alignItems: "center",
    },
    card: {
      backgroundColor: "transparent",
      overflow: "hidden",
      marginBottom: 15,
    },
    image: {
      width: "auto",
      height: 210,
      // resizeMode:"stretch"
    },
    content: {
      padding: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color:isDarkMode? "#fff": "#333",
    },
    description: {
      fontSize: 14,
      color: isDarkMode?"#fff9":"#666",
      marginVertical:5,
      marginBottom: 10,
    },
    loadingIndicator: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -12.5 }, { translateY: -12.5 }],
    },
  });
};

export default getStyles;
