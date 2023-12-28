import { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useRoute } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-simple-toast";
/* import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads"; */

import Button from "../components/Buttons/Button";
import ImageQR from "../components/ImageQR";

import { AppStateContext } from "../context/AppStateProvider";

function ResultView() {
  const {
    autoCopyToClipboard,
    globalContainerStyle,
    globalIconColor,
    globalMainContainerStyle,
    globalPrimaryColor,
    globalBackgoundColor,
    globalTitleColor,
  } = useContext(AppStateContext);

  let toastShown = false;

  const {
    params: { data },
  } = useRoute(); //con esto pedimos los parametros enviados por ruta

  useEffect(() => {
    // If auto copy is enabled copy automatically when render
    if(autoCopyToClipboard) {
      copyToClipboard();
    }
  }, [])
  

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
    <View
      style={[
        globalMainContainerStyle,
        { backgroundColor: globalBackgoundColor },
      ]}
    >
      <View
        style={[
          styles.text_container,
          globalContainerStyle,
          {backgroundColor: globalPrimaryColor},
        ]}
      >
        <Text style={[styles.text, { color: globalTitleColor }]}>{data}</Text>
        <Button
          icon={"content-copy"}
          library={"MaterialIcons"}
          color={globalIconColor}
          onPress={copyToClipboard}
        />
      </View>
      {/* QR code generator */}
      <ImageQR
        data={data}
        containerStyle={[
          globalContainerStyle,
          { backgroundColor: globalPrimaryColor },
        ]}
      />
      {/* Banner de anuncios */}
      {/* <View style={styles.bannerContainer}>
        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.FLUID}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  text_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  text: { width: "84%", fontWeight: "400", fontSize: 15 },

  bannerContainer: {
    width: "100%",
  },
});

export default ResultView;
