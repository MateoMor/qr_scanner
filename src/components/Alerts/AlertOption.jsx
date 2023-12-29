import { useContext } from "react";
import { Text, StyleSheet, Pressable } from "react-native";

import Button from "../Buttons/Button";
import { AppStateContext } from "../../context/AppStateProvider";

const AlertOption = ({ selected, children, onPress, itemsColor }) => {
  const { globalTitleColor } = useContext(AppStateContext);

  return (
    <Pressable
      onPress={() => {
        onPress();
      }}
      style={styles.mainContainer}
    >
      <Button
        library={"MaterialIcons"}
        icon={selected ? "radio-button-checked" : "radio-button-unchecked"}
        onPress={() => {
          onPress();
        }}
        color={itemsColor}
      />
      <Text style={[styles.text, { color: globalTitleColor }]}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    gap: 14,
  },
  text: { fontSize: 15 },
});

export default AlertOption;
