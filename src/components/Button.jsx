import React, { useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// button with
function Button({
  size = 28, // Tamaño del icono
  onPress, // Función al presionar
  icon,
  color = "white", // Color del botón
  animationColor = "#bbbbbb", // Color de la animación al precionar
  library = "Ionicons", // Libreria de donde se sacan los iconos
}) {
  const [scaleAnimate, setScaleAnimate] = useState(new Animated.Value(0));

  const animationWidth = size + 10;
  const customBorderRadius = animationWidth / 2;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnimate, {
        duration: 0,
        useNativeDriver: true,
        toValue: 1,
      }),
      Animated.timing(scaleAnimate, {
        duration: 120,
        useNativeDriver: true,
        toValue: 1.1,
      }),
      Animated.timing(scaleAnimate, {
        duration: 150,
        useNativeDriver: true,
        toValue: 0.93,
      }),
      Animated.timing(scaleAnimate, {
        duration: 0,
        useNativeDriver: true,
        toValue: 0,
      }),
    ]).start();
  };

  return (
    <View>
      <Pressable
        onPress={() => {
          onPress();
          handlePress();
        }}
        style={[styles.button, { width: animationWidth }]}
      >
        <Animated.View
          style={[
            styles.pressAnimation,
            {
              transform: [{ scale: scaleAnimate }],
              borderRadius: customBorderRadius,
              backgroundColor: animationColor,
            },
          ]}
        />
        {/* Ioicons o MaterialIcons son soportados */}
        {library === "Ionicons" ? (
          <Ionicons name={icon} size={size} color={color} />
        ) : (
          <MaterialIcons name={icon} size={size} color={color} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pressAnimation: {
    width: "100%",
    height: "100%",
    opacity: 0.25,
    position: "absolute",
  },
});

export default Button;
