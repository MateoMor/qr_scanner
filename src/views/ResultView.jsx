import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

function ResultView() {
  const {
    params: { data },
  } = useRoute(); //con esto pedimos los parametros enviados por ruta

  return (
    <View style={styles.container}>
      <Text>{data}</Text>
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ResultView;
