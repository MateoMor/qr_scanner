import React from "react";
import { Text, View } from "react-native";

import TitleSpace from "../components/TitleSpace";
import DefaultOptionBox from "../components/DefaultOptionBox";

import {
  globalContainerStyle,
  globalMainContainer,
} from "../global/globalVariables";

function Settings() {
  return (
    <View style={globalMainContainer}>
      <TitleSpace title="Scanner" />
      <View style={[globalContainerStyle, { padding: 0 }]}>
        <DefaultOptionBox title="Vibration" />
      </View>
    </View>
  );
}

export default Settings;
