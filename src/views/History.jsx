import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import TitleSpace from "../components/LayoutComponents/TitleSpace";
import DefaultOptionBox from "../components/Buttons/DefaultOptionBox";
import Header from "../components/LayoutComponents/Header";

import { AppStateContext } from "../context/AppStateProvider";
import { getDataAsync } from "../utils/AsyncStorageFunctions";
import OptionThemeAlert from "../components/Alerts/OptionThemeAlert";
import IconColorPalette from "../components/Buttons/IconColorPalette";
import OptionEngineAlert from "../components/Alerts/OptionEngineAlert";
import { useIsFocused } from "@react-navigation/native";
import HistoryElement from "../components/LayoutComponents/HistoryComponents/HistoryElement";

function History() {
  const {
    globalContainerStyle,
    globalMainContainerStyle,
    globalPrimaryColor,
    globalBackgoundColor,
    setIsThemeAlertShown,
    setIsEngineAlertShown,
  } = useContext(AppStateContext);

  // Function to check for the theme preference at the beggining of the render
  const themePreferenceCheckOption = async () => {
    const themePreference = await getDataAsync("themePreference");
    setThemePreferenceOptionSelected(themePreference);
  };

  // code that activates when the screen is focused or unfocused
  const isFocused = useIsFocused();
  useEffect(() => {
    setIsThemeAlertShown(false);
    setIsEngineAlertShown(false);
  }, [isFocused]);

  return (
    <View style={{ backgroundColor: globalBackgoundColor, flex: 1 }}>
      <ScrollView stickyHeaderIndices={[0] /* Sticky header */}>
        <Header title={"History"}></Header>
        <View style={[globalMainContainerStyle]}>
          <TitleSpace title="01/01/2024" />
          <View
            style={[
              globalContainerStyle,
              styles.container,
              { backgroundColor: globalPrimaryColor },
            ]}
          >
            <HistoryElement type={"url"} data={"Hello"} time={"10:00"}/>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
});

export default History;
