import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";

import Scanner from "../views/Scanner";
import ResultView from "../views/ResultView";
import Settings from "../views/Settings";
import { AppStateContext } from "../context/AppStateProvider";

// Creo una instancia de createNativeStackNavigator que almacenará las rutas'
const Stack = createNativeStackNavigator();

function MainStack() {

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

  return (
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
  )
}

export default MainStack