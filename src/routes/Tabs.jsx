import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";

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

  let headerColor = "#0F238C";
  let titlteColor = "#FFFFFF";

  if (currentTheme === "dark") {
    if (isHeaderBlurred) {
      headerColor = "#0D0D0D"; // 75% opacity
      titlteColor = "#3F3F3F"; // 75% opacity
    } else {
      headerColor = "#222222"; // Same as globalPrimaryColor
    }
  } else {
    if (isHeaderBlurred) {
      headerColor = "#040923"; // 75% opacity
      titlteColor = "#3F3F3F"; // 75% opacity
    } else {
      headerColor = "#0F238C";
    }
  }

  // useEffect to coordinate navigation bar color with the bottomTab color
  useEffect(() => {
    if (currentTheme === "dark") {
      isHeaderBlurred
        ? NavigationBar.setBackgroundColorAsync("#0D0D0D")
        : NavigationBar.setBackgroundColorAsync("#222222");
    } else {
      isHeaderBlurred
        ? NavigationBar.setBackgroundColorAsync("#040923")
        : NavigationBar.setBackgroundColorAsync("#0F238C");
    }
  }, [isHeaderBlurred]);

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName="ScannerStack"
        activeColor={globalItemsColor}
        inactiveColor={"#FFFFFF"}
        shifting={false}
        labeled={false}
        activeIndicatorStyle={{ height: 35 }}
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
                size={24}
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
              <MaterialCommunityIcons name="history" color={color} size={24} />
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
              <Ionicons name="settings-sharp" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Tabs;
