import { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Scanner from "../views/Scanner";
/* import ResultView from "../views/ResultView"; */
import Settings from "../views/Settings";

const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  const [color, setColor] = useState("#000000");

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "#694fad" }}
    >
      <Tab.Screen
        name="Scanner"
        component={Scanner}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={"#000000"} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Settings" component={Settings} /> 
    </Tab.Navigator>
  );
}

export default Tabs;
