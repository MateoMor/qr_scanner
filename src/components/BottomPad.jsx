import React from "react";
import { StyleSheet, View } from "react-native";
import ZoomSlider from "./ZoomSlider";

function BottomPad({ zoom, setZoom }) {
  return (
    <View style={styles.container}>
      <ZoomSlider zoom={zoom} setZoom={setZoom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: "absolute",
  bottom: "15%",
  left: "10%",
  right: "10%",

  paddingHorizontal: 30,
  padding: 30,
  zIndex: 100, },
});

export default BottomPad;
