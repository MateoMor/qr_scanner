import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Button from "./Button";
import { AppStateContext } from "../../context/AppStateProvider";

function DefaultOptionBox({
  title,
  description,
  onPress,
  check,
  setCheck,
  checkable = true, // If checkbox exists or not
}) {
  const { globalItemsColor, globalTitleColor, globalSubtitleStyle } =
    useContext(AppStateContext);

  return (
    <Pressable
      style={styles.mainContainer}
      onPress={() => {
        onPress();
      }}
    >
      <View style={styles.leftContainer}>
        <Text style={[styles.title, { color: globalTitleColor }]}>{title}</Text>
        {description && (
          <Text style={[styles.description, globalSubtitleStyle]}>
            {description}
          </Text>
        )}
      </View>
      <View style={styles.rightContainer}>
        {checkable && (
          <Button
            icon={check ? "check-box" : "check-box-outline-blank"}
            library={"MaterialIcons"}
            color={globalItemsColor}
            size={24}
            onPress={() => {
              onPress();
            }}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  leftContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: "85%",
  },
  title: {},
  description: {},
});

export default DefaultOptionBox;
