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

function Settings() {
  const {
    toggleVibrationState,
    vibration,
    toggleBeepState,
    beep,
    autoSearch,
    toggleAutoCopyToClipboard,
    toggleAutoSearch,
    autoCopyToClipboard,
    globalContainerStyle,
    globalMainContainerStyle,
    globalPrimaryColor,
    globalBackgoundColor,
    setIsHeaderBlurred,
    isThemeAlertShown, // Manages the visibility of the theme alert
    setIsThemeAlertShown,
    isEngineAlertShown, // Manages the visibility of the engine alert
    setIsEngineAlertShown,
  } = useContext(AppStateContext);

  const scrollEnabled = isThemeAlertShown || isEngineAlertShown ? false : true; // To know if the component is scrollable or not

  const [themePreferenceOptionSelected, setThemePreferenceOptionSelected] =
    useState("auto");

  // Function to open alerts with a useState as conditional
  const openAlert = (alertSetter) => {
    alertSetter(true);
    setIsHeaderBlurred(true);
  };

  // Function to check for the theme preference at the beggining of the render
  const themePreferenceCheckOption = async () => {
    const themePreference = await getDataAsync("themePreference");
    setThemePreferenceOptionSelected(themePreference);
  };

  useEffect(() => {
    themePreferenceCheckOption();
  }, []);

  useEffect(() => {
    themePreferenceCheckOption();
  }, [vibration, beep]);

  // code that activates when the screen is focused or unfocused
  const isFocused = useIsFocused();
  useEffect(() => {
    setIsThemeAlertShown(false);
    setIsEngineAlertShown(false);
  }, [isFocused]);

  return (
    <View style={{ backgroundColor: globalBackgoundColor, flex: 1 }}>
      <Header title={"Settings"} />
      <ScrollView scrollEnabled={scrollEnabled}>
        <View style={[globalMainContainerStyle]}>
          <TitleSpace title="Appereance" />
          <View
            style={[
              globalContainerStyle,
              styles.container,
              { backgroundColor: globalPrimaryColor },
            ]}
          >
            <DefaultOptionBox
              title="Theme"
              onPress={() => {
                openAlert(setIsThemeAlertShown);
              }}
              checkable={false}
            />
            <IconColorPalette />
          </View>
          <TitleSpace title="Scanner" />
          <View
            style={[
              globalContainerStyle,
              styles.container,
              { backgroundColor: globalPrimaryColor },
            ]}
          >
            <DefaultOptionBox
              title="Vibration"
              onPress={async () => {
                toggleVibrationState();
              }}
              check={vibration}
            />
            <DefaultOptionBox
              title="Beep"
              onPress={async () => {
                toggleBeepState();
              }}
              description="Sound when scanned"
              check={beep}
            />
          </View>
          <TitleSpace title="Results" />
          <View
            style={[
              globalContainerStyle,
              styles.container,
              { backgroundColor: globalPrimaryColor },
            ]}
          >
            <DefaultOptionBox
              title="Auto Copy to Clipboard"
              onPress={async () => {
                toggleAutoCopyToClipboard();
              }}
              check={autoCopyToClipboard}
            />
            <DefaultOptionBox
              title="Search Engine"
              onPress={async () => {
                openAlert(setIsEngineAlertShown);
              }}
              checkable={false}
            />
            <DefaultOptionBox
              title="Automatically open URLs"
              description="Open websites after scanning a QR with URL"
              onPress={async () => {
                toggleAutoSearch();
              }}
              check={autoSearch}
            />
          </View>
        </View>
      </ScrollView>
      {/* Alert frame to display alerts */}
      {isThemeAlertShown && (
        <OptionThemeAlert
          selectedTheme={themePreferenceOptionSelected}
          setSelectedTheme={setThemePreferenceOptionSelected}
        />
      )}
      {isEngineAlertShown && (
        <OptionEngineAlert
          selectedTheme={themePreferenceOptionSelected}
          setSelectedTheme={setThemePreferenceOptionSelected}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
});

export default Settings;
