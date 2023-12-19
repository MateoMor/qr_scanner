import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppStateContext } from "../context/AppStateProvider";

function TitleSpace({ title }) {
  const { globalBackgoundColor, globalSubtitleColor } =
    useContext(AppStateContext);

  return (
    <View
      style={[styles.mainContainer, { backgroundColor: globalBackgoundColor }]}
    >
      <Text style={[styles.title, { color: globalSubtitleColor }]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 8,
    marginLeft: 14,
  },
  title: {
    fontWeight: "500",
  },
});

export default TitleSpace;
