import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { View } from "react-native";

const SkeletonLoader = ({ darkMode }: { darkMode: Boolean }) => {
  const backgroundColor = darkMode ? "#333" : "#f3f3f3";
  const foregroundColor = darkMode ? "#555" : "#ecebeb";

  return (
    <View style={{ padding: 10 }}>
      <ContentLoader
        speed={2}
        width={"100%"}
        height={250}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
      >
        {/* Skeleton for image */}
        <Rect x="0" y="0" rx="10" ry="10" width="100%" height="150" />

        {/* Skeleton for title */}
        <Rect x="0" y="160" rx="4" ry="4" width="70%" height="20" />

        {/* Skeleton for description */}
        <Rect x="0" y="190" rx="3" ry="3" width="90%" height="15" />
        <Rect x="0" y="210" rx="3" ry="3" width="80%" height="15" />
      </ContentLoader>
    </View>
  );
};

export default SkeletonLoader;
