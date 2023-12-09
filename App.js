import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import Routes from "./src/routes/Routes";

export default function App() {
  return (
    <View style={styles.container}>
      <Routes/>
      {/* <Scanner /> */}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
