import { NavigationContainer } from "@react-navigation/native"; // Componente pricnipal a través del que se crearan las rutas
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainStack from "./MainStack";
import Tabs from "./Tabs";

function Routes() {
  return (
    <NavigationContainer>
      {/* <MainStack /> */}
      <Tabs />
    </NavigationContainer>
  );
}

export default Routes;
