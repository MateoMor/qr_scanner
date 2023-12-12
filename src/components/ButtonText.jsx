import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// This button have an icon, text and an animation when pressed
function ButtonText({ icon, iconColor = "white", color, onPress, text, library = "Ionicons" }) {
  const [animatedButtonMove, setAnimatedButtonMove] = useState(
    new Animated.ValueXY({ x: 0, y: 0 })
  );

  // This can be done with only an animated value, but this way the code would be more useful in the future
  const onPressAnimation = () => {
    Animated.sequence([
      Animated.timing(animatedButtonMove, {
        toValue: { x: 0, y: -3 },
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedButtonMove, {
        toValue: { x: 0, y: 0 },
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={{
        transform: [
          { translateX: animatedButtonMove.x },
          { translateY: animatedButtonMove.y },
        ],
      }}
    >
      <Pressable
        style={[styles.mainContainer, { backgroundColor: color }]}
        onPress={() => {
          onPressAnimation();
          onPress();
        }}
      >
        <View style={styles.iconView}>
          {library === "Ionicons" ? (
            <Ionicons name={icon} size={24} color={iconColor} />
          ) : (
            <MaterialIcons name={icon} size={24} color={iconColor} />
          )}
        </View>
        <Text style={styles.textStyle}>{text}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  iconView: { marginRight: 9 },
  textStyle: { color: "white", fontWeight: "700" },
});

export default ButtonText;
