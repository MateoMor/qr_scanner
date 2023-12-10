import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

function ResultView() {
  const {
    params: { data },
  } = useRoute(); //con esto pedimos los parametros enviados por ruta

  return (
    <View style={styles.container}>
      <View style={[styles.text_container, styles.containerStyles]}>
        <Text style={styles.text}>{data}</Text>
      </View>
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fafafa",
  },

  text_container: { flexDirection: "row" },

  text: { fontWeight: "400" },

  containerStyles: {
    backgroundColor: "#fefefe",
    justifyContent: "center",
    padding: 4,
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
