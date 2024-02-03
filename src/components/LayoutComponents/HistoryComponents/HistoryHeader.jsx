import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
/* import Button from "../../Buttons/Button"; */

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

function HistoryHeader({
  currentTheme, // Receives the current theme to avoid calling it from context and re-render
  checkBoxShown,
  setCheckBoxShown,
  idsToDeleteList,
  setIdsToDeleteList,
  setDeleteItems,
}) {
  let headerColor = "rgb(7,26,93)";

  if (currentTheme === "dark") {
    headerColor = "#222222"; // Same as globalPrimaryColor
  }

  // This function restart all the states used to delete history items
  const closeButtonHandler = () => {
    setCheckBoxShown(false); // When turning off checkbox each History element will trigger a useEffect to uncheck them
    setIdsToDeleteList([]);
  };

  // Turn off checkboxes and trigger the deletion in History component
  const deleteButtonHandler = () => {
    setCheckBoxShown(false);
    setDeleteItems(true);
  };

  return (
    <View style={[styles.mainContainer, { backgroundColor: headerColor }]}>
      <View style={styles.leftContainer}>
        {checkBoxShown && (
          <Pressable onPress={() => closeButtonHandler()}>
            <Ionicons name="close" size={24} color="white" />
          </Pressable>
        )}
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.title}>
          {checkBoxShown ? `Selected ${idsToDeleteList.length}` : "History"}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        {checkBoxShown && (
          <Pressable onPress={() => deleteButtonHandler()}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={24}
              color="white"
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: 84,
    padding: 12,
    flexDirection: "row",
  },
  leftContainer: { flex: 1, flexDirection: "row", alignItems: "flex-end" },
  middleContainer: { width: 180 },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  title: {
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 24,
  },
});

export default React.memo(HistoryHeader); // Prevent re-rendering
