import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Button({ title, onPress, icon, color }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Ionicons name={icon} size={28} color={color ? color : "white"} />
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

styles = StyleSheet.create({
  button: { height: 40, flexDirection: "row", justifyContent: "center" },
  text: { fontWeight: "bold", fontSize: 16, color: "#f1f1f1", marginLeft: 10 },
});

export default Button;
