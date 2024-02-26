import { StyleSheet, View } from "react-native";
import React from "react";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const FooterBanner = () => {
  return (
    <View style={styles.adContainer}>
      <View>
        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
      {/* This is a placeholder */}
      {/* <View style={{ backgroundColor: "green", width: 468, height: 60 }} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  adContainer: {
    width: "100%",
    height: 60,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default FooterBanner;
