import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppStateContext } from "../../context/AppStateProvider";

function Header({ title }) {
  const { isHeaderBlurred, currentTheme } = useContext(AppStateContext);

  let headerColor = "rgb(7,26,93)";
  let titlteColor = "#FFFFFF";

  if (currentTheme === "dark") {
    /* if (isHeaderBlurred) {
      headerColor = "#151515"; // 25% opacity
      titlteColor = "#BFBFBF"; // 25% opacity
    } else { */
      headerColor = "#222222"; // Same as globalPrimaryColor
    /* } */
  } else {
    /* if (isHeaderBlurred) {
      headerColor = "rgb(5, 19, 70)"; // 25% opacity
      titlteColor = "#BFBFBF"; // 25% opacity
    } else { */
      headerColor = "rgb(7,26,93)";
    /* } */
  }

  return (
    <View style={[styles.container, { backgroundColor: headerColor }]}>
      <Text style={styles.title}>{title}</Text>
      {/* <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "black",
          opacity: isHeaderBlurred
            ? 0.75
            : 0,
        }}
      /> this are styles to show when header is blurred */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 84,
    padding: 12,
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 24,
  },
});

export default Header;
