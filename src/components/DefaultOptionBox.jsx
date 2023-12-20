import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "./Button";
import { AppStateContext } from "../context/AppStateProvider";


function DefaultOptionBox({ title, description, check, setCheck }) {
  const {
    changeThemePreference,
    globalIconColor,
    globalSubtitleColor,
    globalTitleColor,
  } = useContext(AppStateContext);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        <Text style={[styles.title, { color: globalTitleColor }]}>{title}</Text>
        {description && (
          <Text style={[styles.description, { color: globalSubtitleColor }]}>
            {description}
          </Text>
        )}
      </View>
      <View style={styles.rightContainer}>
        <Button
          icon={check ? "check-box" : "check-box-outline-blank"}
          library={"MaterialIcons"}
          color={globalIconColor}
          size={24}
          onPress={async () => {
            changeThemePreference("auto")
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
  title: {},
  description: {},
});

export default DefaultOptionBox;
