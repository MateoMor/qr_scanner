import { useEffect, useState } from "react";
import { Animated, StyleSheet, View, useWindowDimensions } from "react-native";

const backgroundColor = "rgba(0, 0, 0, 0.4)";

// Este componente crea la imágen del scaner con el fondo y la animación
function ScannerAnimation() {
  const { height, width } = useWindowDimensions();
  const [fadeIn, setFadeIn] = useState(new Animated.Value(0.5));
  const [scanerPointerPos, setScanerPointerPos] = useState(
    new Animated.Value(0)
  );

  useEffect(() => {
    const windowHeight = width - width * 0.3 - 9; // Altura de la ventana de scaner
    const movementTime = 3900; // Tiempo en el que la barra hace medio recorrido

    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scanerPointerPos, {
            duration: movementTime, // Mitad del tiempo
            useNativeDriver: true,
            toValue: windowHeight,
          }),
          Animated.timing(scanerPointerPos, {
            duration: movementTime, // Mitad del tiempo
            useNativeDriver: true,
            toValue: 0,
          }),
        ]),
        Animated.loop(
          Animated.sequence([
            Animated.timing(fadeIn, {
              duration: 1100, 
              useNativeDriver: true,
              toValue: 1,
              delay: 300,
            }),
            Animated.timing(fadeIn, {
              duration: 1100, 
              useNativeDriver: true,
              toValue: 0.4,
              delay: 100,
            }),
          ]),
          { iterations: 3 } /*  Número de iteraciones */
        ),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.scanner}>
      <Animated.View
        style={[
          styles.scanPointer,
          { opacity: fadeIn, transform: [{ translateY: scanerPointerPos }] },
        ]}
      />
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
    right: "15%",
    left: "15%",
    aspectRatio: 1 / 1,
    borderColor: "#09c6e6",
    borderWidth: 3,
  },
  scanPointer: {
    width: "100%",
    height: 3,
    backgroundColor: "#4cbb17",
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
