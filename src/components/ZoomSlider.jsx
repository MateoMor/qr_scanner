import Slider from "@react-native-community/slider";
import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function ZoomSlider({ zoom, setZoom }) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="zoom-out" size={28} color={"white"} />
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={zoom}
        onValueChange={(value) => {
          setZoom(value);
        }}
        minimumTrackTintColor="#06b6d4"
        maximumTrackTintColor="#cbd5e1"
      />
      <MaterialIcons name="zoom-in" size={28} color={"white"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    
    
    
  },
  slider: {
    width: "100%",
  },
});

export default ZoomSlider;
