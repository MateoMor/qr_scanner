import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native"; // Componente pricnipal a través del que se crearan las rutas
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Scanner from "../views/Scanner";
import ResultView from "../views/ResultView";
import Settings from "../views/Settings";
import { AppStateContext } from "../context/AppStateProvider";

// Creo una instancia de createNativeStackNavigator que almacenará las rutas
const Stack = createNativeStackNavigator();

function Routes() {
  const { headerColor } = useContext(AppStateContext);

  const routeScreenOptions = {
    headerStyle: {
      backgroundColor: headerColor,
    },
    headerTitleStyle: {
      color: "white",
      fontWeight: "bold",
    },
    headerTintColor: "#fff",
    headerTitleAlign: "center",
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Scanner">
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{ headerShown: false, unmountOnBlur: true }}
        />
        <Stack.Screen
          name="Details"
          component={ResultView}
          options={routeScreenOptions}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={routeScreenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
