import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Settings from "../views/Settings";
import History from "../views/History";
import ScannerStack from "./ScannerStack";
import { AppStateContext } from "../context/AppStateProvider";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  const {
    setIsHeaderBlurred,
    isHeaderBlurred,
    currentTheme,
    globalItemsColor,
    setisCameraReady,
  } = useContext(AppStateContext);

  let headerColor = "rgb(7,26,93)";
  let titlteColor = "#FFFFFF";
  const defaultIconColor = "#BFBFBF";

  if (currentTheme === "dark") {
    if (isHeaderBlurred) {
      headerColor = "rgb(7, 7, 7)"; // 75% opacity
      titlteColor = "rgb(63, 63, 63)"; // 75% opacity
    } else {
      headerColor = "#1C1C1C"; // Same as globalPrimaryColor
    }
  } else {
    if (isHeaderBlurred) {
      headerColor = "rgb(1, 7, 35)"; // 75% opacity
      titlteColor = "rgb(63, 63, 63)"; // 75% opacity
    } else {
      headerColor = "rgb(7,26,93)";
    }
  }

  const [currentTab, setCurrentTab] = useState(0);

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName="ScannerStack"
        activeColor={globalItemsColor}
        /*  inactiveColor="green" */
        shifting={true}
        labeled={true}
        barStyle={{ backgroundColor: headerColor, height: 70 }}
      >
        <Tab.Screen
          listeners={{
            tabPress: () => {
              setIsHeaderBlurred(false);
              setCurrentTab(0);
              setisCameraReady(true);
            },
          }} // listener to unblur header if it is blurred
          name="ScannerStack"
          component={ScannerStack}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="crop-free"
                color={currentTab === 0 ? globalItemsColor : defaultIconColor}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          listeners={{
            tabPress: () => {
              setIsHeaderBlurred(false);
              setCurrentTab(1);
              setisCameraReady(false);
            },
          }}
          name="History"
          component={History}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="history"
                color={currentTab === 1 ? globalItemsColor : defaultIconColor}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          listeners={{
            tabPress: () => {
              setIsHeaderBlurred(false);
              setCurrentTab(2);
              setisCameraReady(false);
            },
          }}
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="settings-sharp"
                color={currentTab === 2 ? globalItemsColor : defaultIconColor}
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
