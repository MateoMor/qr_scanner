import { SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import Routes from "./src/routes/Routes";

export default function App() {
  return (
    /* SafeAreaView to prevent the use of buttons space */
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
      <View style={styles.container}>
        <Routes />
        {/* <Scanner /> */}
        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
