import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Settings from "../views/Settings";
import ScannerStack from "./ScannerStack";
import { AppStateContext } from "../context/AppStateProvider";

const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  const { setIsHeaderBlurred, isHeaderBlurred, currentTheme } =
    useContext(AppStateContext);

  let headerColor = "rgb(7,26,93)";
  let titlteColor = "#FFFFFF";

  if (currentTheme === "dark") {
    if (isHeaderBlurred) {
      headerColor = "rgb(7, 7, 7)"; // 75% opacity
      titlteColor = "rgb(63, 63, 63)"; // 75% opacity
    } else {
      headerColor = "#1C1C1C"; // Same as globalPrimaryColor
    }
  } else {
    console.log("isHeaderBlurred", isHeaderBlurred);
    if (isHeaderBlurred) {
      headerColor = "rgb(1, 7, 35)"; // 75% opacity
      titlteColor = "rgb(63, 63, 63)"; // 75% opacity
    } else {
      headerColor = "rgb(7,26,93)";
    }
  }

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName="ScannerStack"
        activeColor="blue"
        inactiveColor="#ffffff"
        shifting={true}
        barStyle={{ backgroundColor: headerColor, height: 70 }}
      >
        <Tab.Screen
          listeners={{ tabPress: () => setIsHeaderBlurred(false) }} // listener to unblur header if it is blurred
          name="ScannerStack"
          component={ScannerStack}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="crop-free"
                color={"#BFBFBF"}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          listeners={{ tabPress: () => setIsHeaderBlurred(false) }}
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="hammer-wrench"
                color={"#BFBFBF"}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Tabs;
