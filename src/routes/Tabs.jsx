import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Settings from "../views/Settings";
import History from "../views/History";
import ScannerStack from "./ScannerStack";
import { AppStateContext } from "../context/AppStateProvider";

const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  const {
    setIsHeaderBlurred,
    isHeaderBlurred,
    currentTheme,
    globalItemsColor,
  } = useContext(AppStateContext);

  let headerColor = "rgb(7,26,93)";
  let titlteColor = "#FFFFFF";

  if (currentTheme === "dark") {
    if (isHeaderBlurred) {
      headerColor = "rgb(13, 13, 13)"; // 75% opacity
      titlteColor = "rgb(63, 63, 63)"; // 75% opacity
    } else {
      headerColor = "#222222"; // Same as globalPrimaryColor
    }
  } else {
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
        activeColor={globalItemsColor}
        inactiveColor={"#BFBFBF"}
        shifting={false}
        labeled={false}
        barStyle={{ backgroundColor: headerColor, height: 70 }}
      >
        <Tab.Screen
          listeners={{
            tabPress: () => {
              setIsHeaderBlurred(false);
              /* setIsCameraReady(true); */
            },
            /* blur: () => {
              setIsCameraReady(false);
            } */
          }} // listener to unblur header if it is blurred
          name="ScannerStack"
          component={ScannerStack}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="crop-free"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          listeners={{
            tabPress: () => {
              setIsHeaderBlurred(false);
              /* setIsCameraReady(false); */
            },
            /* blur: () => {
              setIsCameraReady(true);
            } */
          }}
          name="History"
          component={History}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="history" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          listeners={{
            tabPress: () => {
              setIsHeaderBlurred(false);
              /* setIsCameraReady(false); */
            },
            /* blur: () => {
              setIsCameraReady(true);
            } */
          }}
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="settings-sharp" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Tabs;
