import React from "react";
import { NavigationContainer } from "@react-navigation/native"; // Componente pricnipal a través del que se crearan las rutas
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Scanner from "../views/Scanner";
import ResultView from "../views/ResultView";
import Settings from "../views/Settings";

const headerColor = "rgba(7,26,93,255)";

// Creo una instancia de createNativeStackNavigator que almacenará las rutas
const Stack = createNativeStackNavigator();
const routeScreenDefaultOptions = {
  headerStyle: {
    backgroundColor: headerColor,
    
  },
  headerTitleStyle: {
    color: "white",
    fontWeight: "bold",
  },
  headerTintColor: "#fff",
  headerTitleAlign: 'center',
};

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Settings">
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{headerShown: false, unmountOnBlur: true}}
        />
        <Stack.Screen
          name="Details"
          component={ResultView}
          options={routeScreenDefaultOptions}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={routeScreenDefaultOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
