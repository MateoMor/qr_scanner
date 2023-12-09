import React from "react";
import { NavigationContainer } from "@react-navigation/native"; // Componente pricnipal a través del que se crearan las rutas
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Scanner from "../views/Scanner";

// Creo una instancia de createNativeStackNavigator que almacenará las rutas
const Stack = createNativeStackNavigator();
const routeScreenDefaultOptions = {
  headerStyle: {
    backgroundColor: "rgba(7,26,93,255)",
  },
  headerTitleStyle: {
    color: "white",
    fontWeight: "bold",
  },
  headerTintColor: "#fff",
};

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Scanner">
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={routeScreenDefaultOptions}
        />
        {/* <Stack.Screen
          name="Detail"
          component={Detail}
          options={routeScreenDefaultOptions}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
