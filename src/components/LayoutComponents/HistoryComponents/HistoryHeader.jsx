import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppStateContext } from "../../../context/AppStateProvider";
import Button from "../../Buttons/Button";

function HistoryHeader({
  checkBoxShown,
  setCheckBoxShown,
  setIdsToDeleteList,
}) {
  const { currentTheme } = useContext(AppStateContext);

  let headerColor = "rgb(7,26,93)";

  if (currentTheme === "dark") {
    headerColor = "#222222"; // Same as globalPrimaryColor
  }

  // This function restart all the states used to delete history items
  const closeButtonHandler = () => {
    setCheckBoxShown(false); // When turning off checkbox each History element will trigger a useEffect to uncheck them
    setIdsToDeleteList([]);
  };

  return (
    <View style={[styles.mainContainer, { backgroundColor: headerColor }]}>
      {checkBoxShown && (
        <View style={styles.leftContainer}>
          <Button
            icon={"close"}
            library={"Ionicons"}
            color={"white"}
            size={24}
            onPress={() => {
              closeButtonHandler();
            }}
          />
        </View>
      )}
      <View style={styles.middleContainer}>
        <Text style={styles.title}>History</Text>
      </View>
      {checkBoxShown && <View style={styles.rightContainer}></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: 84,
    padding: 12,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  leftContainer: { justifyContent: "flex-end", width: "50%" },
  middleContainer: { backgroundColor: "grey" },
  rightContainer: { width: "50%" },
  title: {
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 24,
  },
});

export default HistoryHeader;
