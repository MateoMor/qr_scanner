import { useContext } from "react";
import { Text, StyleSheet, Pressable } from "react-native";

import Button from "../Button";
import { AppStateContext } from "../../context/AppStateProvider";

const AlertOption = ({ selected, children, onPress, setOpen, itemsColor }) => {
  const { globalTitleColor } = useContext(AppStateContext);

  // Instructions to make when the option is selected
  const onPressAction = () => {
    onPress(); // Action when selected
    setOpen(false); // Closes the alert screen
  };

  return (
    <Pressable onPress={onPressAction} style={styles.mainContainer}>
      <Button
        library={"MaterialIcons"}
        icon={selected ? "radio-button-checked" : "radio-button-unchecked"}
        onPress={onPressAction}
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
