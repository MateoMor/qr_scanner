import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import TitleSpace from "../components/TitleSpace";
import DefaultOptionBox from "../components/Buttons/DefaultOptionBox";

import { AppStateContext } from "../context/AppStateProvider";
import { getDataAsync } from "../utils/AsyncStorageFunctions";
import OptionThemeAlert from "../components/Alerts/OptionThemeAlert";
import IconColorPalette from "../components/Buttons/IconColorPalette";

function Settings() {
  const {
    vibration,
    beep,
    toggleVibrationState,
    toggleBeepState,
    globalContainerStyle,
    globalMainContainerStyle,
    globalPrimaryColor,
    globalBackgoundColor,
    isAlertShown, // Manage the visibility of the alert
    setIsAlertShown,
  } = useContext(AppStateContext);

  const scrollEnabled = isAlertShown ? false : true; // To know if the component is scrollable or not

  const [themePreferenceOptionSelected, setThemePreferenceOptionSelected] =
    useState("auto");

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

  return (
    <ScrollView scrollEnabled={scrollEnabled}>
      <View
        style={[
          globalMainContainerStyle,
          { backgroundColor: globalBackgoundColor },
        ]}
      >
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
            onPress={async () => {
              setIsAlertShown(true);
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
          <DefaultOptionBox title="Auto Copy to Clipboard" />
          <DefaultOptionBox title="Search Engine" />
          <DefaultOptionBox
            title="Automatically open URLs"
            description="Automatically open websites after scanning QR with URL"
          />
        </View>
        {/* Alert frame to display alerts */}
        {isAlertShown && (
          <OptionThemeAlert
            selectedTheme={themePreferenceOptionSelected}
            setSelectedTheme={setThemePreferenceOptionSelected}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
});

export default Settings;
