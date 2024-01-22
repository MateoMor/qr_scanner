import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
/* import { useHeaderHeight } from "@react-navigation/elements"; */

import { AppStateContext } from "../../context/AppStateProvider";

function AlertFrame({ closeAlert, itemsColor, children }) {
  const { globalPrimaryColor } = useContext(AppStateContext);

  /* const headerHeight = useHeaderHeight(); */

  return (
    <Pressable onPress={closeAlert} style={styles.background}>
      <View style={styles.mainContainer}>
        <View
          style={{
            height: 70,
            width: "100%",
          }}
        />
        <Pressable
          style={[styles.container, { backgroundColor: globalPrimaryColor }]}
        >
          <View style={styles.childrenContainer}>{children}</View>
          <Pressable style={styles.cancelContainer} onPress={closeAlert}>
            <Text style={[styles.cancel, { color: itemsColor }]}>CANCEL</Text>
          </Pressable>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.75)",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: { width: "100%", alignItems: "center" },
  container: {
    backgroundColor: "white",
    width: "80%",
    alignItems: "flex-end",
    borderRadius: 10,
    padding: 14,
    gap: 10,
  },
  cancelContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  childrenContainer: { width: "100%" },
  cancel: { padding: 10, fontSize: 15, fontWeight: "500" },
});

export default AlertFrame;
