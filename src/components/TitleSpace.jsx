import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalBackgoundColor } from "../global/globalVariables";

function TitleSpace({ title }) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: globalBackgoundColor,
    marginVertical: 8,
    marginLeft: 10,
  },
  title: {
    color: "#35424a",
    fontWeight: "500",
  },
});

export default TitleSpace;
