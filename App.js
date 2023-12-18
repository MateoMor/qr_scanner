import { SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import Routes from "./src/routes/Routes";
import { AppStateProvider } from "./src/context/AppStateProvider";

export default function App() {
  return (
    /* SafeAreaView to prevent the use of buttons space */
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
      <AppStateProvider>
        <View style={styles.container}>
          <Routes />
          {/* <Scanner /> */}
          <StatusBar style="light" />
        </View>
      </AppStateProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
