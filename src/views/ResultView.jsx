import { StyleSheet, Text, View } from "react-native";

import { useRoute } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-simple-toast";

import Button from "../components/Button";

function ResultView() {
  let toastShown = false;

  const {
    params: { data },
  } = useRoute(); //con esto pedimos los parametros enviados por ruta

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(data);

    // Alert when copy with timeout to show again
    if (!toastShown) {
      Toast.show("Copied to clipboard!");
      toastShown = true;
      setTimeout(() => {
        toastShown = false;
      }, 2000);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.text_container, styles.containerStyles]}>
        <Text style={styles.text}>{data}</Text>
        <Button
          icon={"content-copy"}
          library={"MaterialIcons"}
          color={"blue"}
          onPress={copyToClipboard}
        />
      </View>
    </View>
  );
}

styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fafafa",
  },

  text_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  text: { width: "84%", fontWeight: "400", fontSize: 15 },

  containerStyles: {
    backgroundColor: "#fefefe",
    padding: 14,
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
});

export default ResultView;
