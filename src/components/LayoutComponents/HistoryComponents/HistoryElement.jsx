import React, { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import HistoryElementIcon from "./HistoryElementIcon";
import { useNavigation } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";

// Component based on ../../../components/Buttons/DefaultOptionBox
function HistoryElement({
  id,
  type,
  data,
  time,
  color,
  titleColor,
  subtitleStyle,
  setIdToDelete,
  checkBoxShown,
  setCheckBoxShown,
  selectAllElementsTrigger,
  selectAllElementsTriggerFalse,
}) {
  const { navigate } = useNavigation();
  const [selected, setSelected] = useState(false);

  console.log("id:", id);

  // With this useEffect all the elements are unchecked when the checkBoxShown is turned off
  useEffect(() => {
    setSelected(false);
  }, [checkBoxShown]);

  // When the selectAllElementsTrigger is true, all element checkboxes are checked (adding id is done in History component). If not, they are unchecked
  useEffect(() => {
    if (selectAllElementsTriggerFalse !== undefined) {
      setSelected(true);
    }
  }, [selectAllElementsTriggerFalse]);

  useEffect(() => {
    if (selectAllElementsTriggerFalse !== undefined) {
      setSelected(false);
    }
  }, [selectAllElementsTrigger]);

  // This function handle waht happens when the delete action is done
  const onPressDeleteHandler = () => {
    setIdToDelete([id]);
    setSelected(!selected);
  };

  const onPressHandler = () => {
    // If the checkbox is shown, interpret the click as a select
    if (checkBoxShown) {
      onPressDeleteHandler();
    } else {
      navigate("Details", { data, isNewData: false });
    }
  };

  // When an element is long pressed, the checkbox interface is shown
  const onLongPressHandler = () => {
    setCheckBoxShown(true);
    onPressDeleteHandler();
    console.log(selected);
  };

  return (
    <Pressable
      style={styles.mainContainer}
      onPress={onPressHandler}
      onLongPress={onLongPressHandler}
    >
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
          {checkBoxShown ? (
            selected ? (
              <MaterialIcons name="check-box" size={26} color={color} />
            ) : (
              <MaterialIcons
                name="check-box-outline-blank"
                size={26}
                color={titleColor}
              />
            )
          ) : (
            <Text style={subtitleStyle}>{time}</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 18, // Not using marginVertical for a better press element experience
    paddingRight: 10,
    paddingLeft: 0, // This padding is replaced with marginHorizontal of iconContainer
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginLeft: 6,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  dataContainer: { width: "80%" },
  typeAndDateContainer: {},
});

export default React.memo(HistoryElement); // Prevent re-rendering
