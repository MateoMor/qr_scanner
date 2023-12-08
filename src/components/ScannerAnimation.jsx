import { StyleSheet, View } from "react-native";

const backgroundColor = "rgba(0, 0, 0, 0.4)";

// Este componente crea la imágen del scaner con el fondo y la animación
function ScannerAnimation() {


  return (
    <View style={styles.scanner}>
      <View style={[styles.upperWall, { backgroundColor }]} />
      <View style={[styles.leftWall, { backgroundColor }]} />
      <View style={[styles.rightWall, { backgroundColor }]} />
      <View style={[styles.bottomWall, { backgroundColor }]} />
    </View>
    
  );
}

const styles = StyleSheet.create({
  scanner: {
    position: "absolute",
    right: "20%",
    left: "20%",
    aspectRatio: 1 / 1,
  },
  upperWall: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    bottom: "100%",
    left: "-100%",
    width: "300%",
    height: "300%",
  },
  leftWall: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    right: "100%",
    width: "100%",
    height: "100%",
  },
  rightWall: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    left: "100%",
    width: "100%",
    height: "100%",
  },
  bottomWall: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    top: "100%",
    left: "-100%",
    width: "300%",
    height: "300%",
  },
});

export default ScannerAnimation;
