import React, { useContext, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import HistoryElementIcon from "./HistoryElementIcon";
import { useNavigation } from "@react-navigation/native";
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

  console.log(Date.now());  
  
  const { navigate } = useNavigation();

  const onPressHandler = () => {
    navigate("Details", { data, isNewData: false });
  };

  return (
    <Pressable style={styles.mainContainer} onPress={onPressHandler}>
      <View style={styles.iconContainer}>
        <HistoryElementIcon color={color} type={type} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.dataContainer}>
          <Text numberOfLines={1} style={{ color: titleColor }}>
            {data}
          </Text>
          <Text style={subtitleStyle}>{type}</Text>
        </View>
        <View style={styles.typeAndDateContainer}>
          <Text style={subtitleStyle}>{time}</Text>
        </View>
      </View>
    </Pressable>
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
    marginHorizontal: 16,
    marginLeft: 6,
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  dataContainer: { width: "94%" },
  typeAndDateContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});

export default React.memo(HistoryElement); // Prevent re-rendering
