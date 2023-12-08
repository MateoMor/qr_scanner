import Slider from "@react-native-community/slider";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function ZoomSlider({ zoom, setZoom }) {
  const stepSize = 0.07;

  const lessZoom = () => {
    if (zoom > stepSize) {
      setZoom(zoom - stepSize);
    } else {
      setZoom(0);
    }
  };

  const increaseZoom = () => {
    if (zoom < 1 - stepSize) {
      setZoom(zoom + stepSize);
    } else {
      setZoom(1);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => lessZoom()}>
        <MaterialIcons name="zoom-out" size={28} color={"white"} />
      </Pressable>
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
      <Pressable onPress={() => increaseZoom()}>
        <MaterialIcons name="zoom-in" size={28} color={"white"} />
      </Pressable>
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
