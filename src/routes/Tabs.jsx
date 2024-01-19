import { useContext, useState } from "react";

/* import { NavigationContainer } from "@react-navigation/native"; */
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
/* import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; */
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppStateContext } from "../context/AppStateProvider";
import Scanner from "../views/Scanner";
import ResultView from "../views/ResultView";
import Settings from "../views/Settings";

/* El tipo Stack es anidado dentro del tipo Tab para tener el header propio de createNativeStackNavigator() */
const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();



function Tabs() {
  const [color, setColor] = useState("#000000");

  // ------------------------------------------------------------------------ //

const { isHeaderBlurred, currentTheme } = useContext(AppStateContext);

let headerColor = "rgb(7,26,93)";
let titlteColor = "#FFFFFF";

// Lógica para modificar el color para simular el oscurecimiento
if (currentTheme === "dark") {
  if (isHeaderBlurred) {
    headerColor = "#151515"; // 25% opacity
    titlteColor = "#BFBFBF"; // 25% opacity
  } else {
    headerColor = "#1C1C1C"; // Same as globalPrimaryColor
  }
} else {
  if (isHeaderBlurred) {
    headerColor = "rgb(5, 19, 70)"; // 25% opacity
    titlteColor = "#BFBFBF"; // 25% opacity
  } else {
    headerColor = "rgb(7,26,93)";
  }
}

const routeScreenOptions = {
  headerStyle: {
    backgroundColor: headerColor,
  },
  headerTitleStyle: {
    color: titlteColor,
    fontWeight: "bold",
  },
  headerTintColor: "#fff",
  headerTitleAlign: "center",
};

// ------------------------------------------------------------------------ //

function ScannerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Scanner"
        component={Scanner}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={routeScreenOptions}
      />
    </Stack.Navigator>
  );
}

function ResultViewStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ResultView"
        component={ResultView}
        options={routeScreenOptions}
      />
    </Stack.Navigator>
  );
}

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="blue"
      inactiveColor="#ffffff"
      barStyle={{ backgroundColor: "red" }}
    >
      <Tab.Screen
        name="ScannerTab"
        component={ScannerStack}
        /* options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={"#000000"} size={26} />
          ),
        }} */
      />
      <Tab.Screen name="ResultViewTab" component={ResultViewStack} />
      <Tab.Screen name="SettingsTab" component={SettingsStack} />
    </Tab.Navigator>
  );
}

export default Tabs;
