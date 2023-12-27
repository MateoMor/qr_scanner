import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { AppStateContext } from "../../context/AppStateProvider";

// Options for the different colors
function ICPoption({ color }) {
  const { changeItemsColor, globalItemsColor, setGlobalItemsColor } =
    useContext(AppStateContext);

  const selected = globalItemsColor === color; // Checks if the option is selected

  return (
    <Pressable
      style={[styles.pressable, { backgroundColor: color }]}
      onPress={() => changeItemsColor(color)}
    >
      {selected && <Ionicons name="checkmark-sharp" size={24} color="white" />}
    </Pressable>
  );
}

function IconColorPalette() {
  const iconColors = [
    "#1973E9",
    "#00A797",
    "#FF6600",
    "#D65DD9",
    "#35464E",
    "#E6211E",
  ];

  const { globalTitleColor } = useContext(AppStateContext);
  return (
    <View style={styles.container}>
      <Text style={{ color: globalTitleColor }}>ColorScheme</Text>
      <View style={styles.colorsContainer}>
        <ICPoption color={iconColors[0]} />
        <ICPoption color={iconColors[1]} />
        <ICPoption color={iconColors[2]} />
        <ICPoption color={iconColors[3]} />
        <ICPoption color={iconColors[4]} />
        <ICPoption color={iconColors[5]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10, paddingVertical: 18, gap: 10 },
  colorsContainer: {
    flexDirection: "row",
    gap: 7,
  },
  pressable: {
    flex: 1,
    aspectRatio: "1/1",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconColorPalette;
