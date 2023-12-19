import React, { useContext }  from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import TitleSpace from "../components/TitleSpace";
import DefaultOptionBox from "../components/DefaultOptionBox";

import { AppStateContext } from "../context/AppStateProvider";

function Settings() {
  const { globalContainerStyle, globalMainContainerStyle } = useContext(AppStateContext);

  return (
    <ScrollView>
      <View style={globalMainContainerStyle}>
        <TitleSpace title="Appereance" />
        <View style={[globalContainerStyle, styles.container]}>
          <DefaultOptionBox title="Theme" />
          <DefaultOptionBox title="Icon Color" />
        </View>
        <TitleSpace title="Scanner" />
        <View style={[globalContainerStyle, styles.container]}>
          <DefaultOptionBox title="Vibration" />
          <DefaultOptionBox title="Beep" description="Sound when scanned" />
        </View>
        <TitleSpace title="Results" />
        <View style={[globalContainerStyle, styles.container]}>
          <DefaultOptionBox title="Auto Copy to Clipboard" />
          <DefaultOptionBox title="Search Engine" />
          <DefaultOptionBox
            title="Automatically open URLs"
            description="Automatically open websites after scanning QR with URL"
          />
        </View>
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
