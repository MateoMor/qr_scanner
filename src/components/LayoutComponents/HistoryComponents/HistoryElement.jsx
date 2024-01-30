import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import HistoryElementIcon from "./HistoryElementIcon";
/* import { AppStateContext } from "../../../context/AppStateProvider"; */

// Component based on ../../../components/Buttons/DefaultOptionBox
function HistoryElement({
  type,
  data,
  time,
  color,
  titleColor,
  subtitleStyle,
}) {
  /* const { globalItemsColor, globalTitleColor, globalSubtitleStyle } =
    useContext(AppStateContext); */

  console.log("Hello :(");

  return (
    <View style={styles.mainContainer}>
      <View style={styles.iconContainer}>
        <HistoryElementIcon color={color} type={type} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.dataContainer}>
          <Text numberOfLines={1} style={{ color: titleColor }}>
            {data}
          </Text>
        </View>
        <View style={styles.typeAndDateContainer}>
          <Text style={subtitleStyle}>{type}</Text>
          <Text style={subtitleStyle}>{time}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    paddingLeft: 0, // This padding is replaced with marginHorizontal of iconContainer
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    marginLeft: 6,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  dataContainer: { width: "94%" },
  typeAndDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default React.memo(HistoryElement); // Prevent re-rendering
