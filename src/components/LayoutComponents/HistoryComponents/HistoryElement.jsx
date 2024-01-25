import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// Component based on ../../../components/Buttons/DefaultOptionBox
function HistoryElement({ type, data, time }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.iconContainer}>
        <Text>{type}</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text>{data}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  iconContainer: {},
  dataContainer: {},
  timeContainer: {},
});

export default HistoryElement;
