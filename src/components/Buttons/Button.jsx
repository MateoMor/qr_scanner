import React, { useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

// Libraries added to this component
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";

// button with
function Button({
  size = 28, // Tamaño del icono
  onPress, // Función al presionar
  icon,
  color = "white", // Color del botón
  animationColor = "#bbbbbb", // Color de la animación al precionar
  library = "Ionicons", // Libreria de donde se sacan los iconos
}) {
  const [iconScale, setContainerScale] = useState(new Animated.Value(1));

  const [backFlashscaleAnimate, setBackFlashscaleAnimate] = useState(
    new Animated.Value(0)
  );

  const animationWidth = size + 10;
  const customBorderRadius = animationWidth / 2;

  const handlePress = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(backFlashscaleAnimate, {
          duration: 0,
          useNativeDriver: true,
          toValue: 1,
        }),
        Animated.timing(backFlashscaleAnimate, {
          duration: 140,
          useNativeDriver: true,
          toValue: 1.1,
        }),
        Animated.timing(backFlashscaleAnimate, {
          duration: 140,
          useNativeDriver: true,
          toValue: 0.93,
        }),
        Animated.timing(backFlashscaleAnimate, {
          duration: 0,
          useNativeDriver: true,
          toValue: 0,
        }),
      ]),
      Animated.sequence([
        Animated.timing(iconScale, {
          duration: 140,
          useNativeDriver: true,
          toValue: 0.9,
        }),
        Animated.timing(iconScale, {
          duration: 140,
          useNativeDriver: true,
          toValue: 1,
        }),
      ]),
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
              transform: [{ scale: backFlashscaleAnimate }],
              borderRadius: customBorderRadius,
              backgroundColor: animationColor,
            },
          ]}
        />
        {/* Ioicons o MaterialIcons son soportados */}
        <Animated.View
          style={[
            {
              transform: [{ scale: iconScale }],
            },
          ]}
        >
          {library === "Ionicons" ? (
            <Ionicons name={icon} size={size} color={color} />
          ) : library === "MaterialIcons" ? (
            <MaterialIcons name={icon} size={size} color={color} />
          ) : library === "MaterialCommunityIcons" ? (
            <MaterialCommunityIcons name={icon} size={size} color={color} />
          ) : library === "AntDesign" ? (
            <AntDesign name={icon} size={size} color={color} />
          ) : (
            <Entypo name={icon} size={size} color={color} />
          )}
        </Animated.View>
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
