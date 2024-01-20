import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useRoute } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-simple-toast";
/* import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads"; */

import Button from "../components/Buttons/Button";
import ImageQR from "../components/LayoutComponents/ImageQR";

import { AppStateContext } from "../context/AppStateProvider";
import Header from "../components/LayoutComponents/Header";

function ResultView() {
  const {
    autoCopyToClipboard,
    globalContainerStyle,
    globalItemsColor,
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
    if (autoCopyToClipboard) {
      copyToClipboard();
    }
  }, []);

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
    <ScrollView
      style={{ backgroundColor: globalBackgoundColor }}
      scrollEnabled={true}
      stickyHeaderIndices={[0] /* Sticky header */}
    >
      <Header title="Details" />
      <View style={[globalMainContainerStyle]}>
        <View
          style={[
            styles.text_container,
            globalContainerStyle,
            { backgroundColor: globalPrimaryColor },
          ]}
        >
          <Text style={[styles.text, { color: globalTitleColor }]}>{data}</Text>
          <Button
            icon={"content-copy"}
            library={"MaterialIcons"}
            color={globalItemsColor}
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
    </ScrollView>
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
