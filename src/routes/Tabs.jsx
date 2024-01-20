import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Scanner from "../views/Scanner";
import ResultView from "../views/ResultView";
import Settings from "../views/Settings";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ScannerStack() {
  return (
    <Stack.Navigator initialRouteName="Scanner">
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="Details" component={ResultView} />
    </Stack.Navigator>
  );
}

function Tabs() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName="ScannerStack"
        activeColor="blue"
        inactiveColor="#ffffff"
        shifting={true}
        barStyle={{ backgroundColor: "#151515", height: 70 }}
      >
        <Tab.Screen
          name="ScannerStack"
          component={ScannerStack}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="crop-free" color={"#BFBFBF"} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="hammer-wrench" color={"#BFBFBF"} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Tabs;