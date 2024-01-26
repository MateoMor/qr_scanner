import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { AppStateContext } from "../../context/AppStateProvider";

// This component is the layout default container, it is not used in settings but should be used 
function DefaultContainer({ children }) {
  const { globalContainerStyle, globalPrimaryColor } =
    useContext(AppStateContext);

  return (
    <View
      style={[
        globalContainerStyle,
        styles.container,
        { backgroundColor: globalPrimaryColor },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
});

export default DefaultContainer;
