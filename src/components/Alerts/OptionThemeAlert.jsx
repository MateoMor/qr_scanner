import { useContext } from "react";

import AlertFrame from "./AlertFrame";
import AlertOption from "./AlertOption";
import { AppStateContext } from "../../context/AppStateProvider";

function OptionThemeAlert({selectedTheme, setSelectedTheme}) {
    const { changeThemePreferenceAsync, globalItemsColor, setIsAlertShown } =
    useContext(AppStateContext);

  return (
    <AlertFrame itemsColor={globalItemsColor} setOpen={setIsAlertShown}>
      <AlertOption
        selected={selectedTheme === "auto"}
        itemsColor={globalItemsColor}
        onPress={async () => {
            setSelectedTheme("auto");
            await changeThemePreferenceAsync("auto");
        }}
        setOpen={setIsAlertShown}
      >
        System Default
      </AlertOption>
      <AlertOption
        selected={selectedTheme === "light"}
        itemsColor={globalItemsColor}
        onPress={async () => {
          setSelectedTheme("light");
          await changeThemePreferenceAsync("light");
        }}
        setOpen={setIsAlertShown}
      >
        Light
      </AlertOption>
      <AlertOption
        selected={selectedTheme === "dark"}
        itemsColor={globalItemsColor}
        onPress={async () => {
          setSelectedTheme("dark");
          await changeThemePreferenceAsync("dark");
        }}
        setOpen={setIsAlertShown}
      >
        Dark
      </AlertOption>
    </AlertFrame>
  );
}

export default OptionThemeAlert;
