import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppStateContext } from "../../context/AppStateProvider";

function Header({ title }) {
  const { currentTheme } = useContext(AppStateContext);

  let headerColor = "#0F238C";

  if (currentTheme === "dark") {
    headerColor = "#222222"; // Same as globalPrimaryColor
  } else {
    headerColor = "#0F238C";
  }

  return (
    <View style={[styles.container, { backgroundColor: headerColor }]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    padding: 12,
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Header;
