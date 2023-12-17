import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import {
  globalIconColor,
  globalSubtitleColor,
  globalTitleColor,
} from "../global/globalVariables";
import Button from "./Button";

function DefaultOptionBox({ title, description, check, setCheck }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <View style={styles.rightContainer}>
        <Button
          icon={check ? "check-box" : "check-box-outline-blank"}
          library={"MaterialIcons"}
          color={globalIconColor}
          size={24}
          onPress={() => {
            console.log(setCheck);
          }}
        />
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
  leftContainer: { flexDirection: "column", justifyContent: "center" },
  title: { color: globalTitleColor },
  description: { color: globalSubtitleColor },
});

export default DefaultOptionBox;
