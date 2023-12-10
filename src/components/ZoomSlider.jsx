import Slider from "@react-native-community/slider";
import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "./Button";

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
      <Button
        icon={"zoom-out"}
        library={"MaterialIcons"}
        onPress={() => lessZoom()}
      />

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
      <Button
        icon={"zoom-in"}
        library={"MaterialIcons"}
        onPress={() => increaseZoom()}
      />
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
