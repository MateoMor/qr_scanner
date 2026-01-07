import { StyleSheet, View } from "react-native";
import React from "react";

/* import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads"; */

const MediumBanner = () => {
  return (
    <View style={styles.adContainer}>
      {/* <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.MEDIUM_RECTANGLE}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> */}
      {/* This is a placeholder */}
      {/* <View style={{ backgroundColor: "green", width: 300, height: 250 }} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  adContainer: {
    width: "100%",
    alignItems: "center",
  },
});

export default MediumBanner;
