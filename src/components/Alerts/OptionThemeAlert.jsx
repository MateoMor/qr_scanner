import { useContext } from "react";

import AlertFrame from "./AlertFrame";
import AlertOption from "./AlertOption";
import { AppStateContext } from "../../context/AppStateProvider";

function OptionThemeAlert({ selectedTheme, setSelectedTheme }) {
  const {
    changeThemePreferenceAsync,
    globalItemsColor,
    setIsThemeAlertShown,
    setIsHeaderBlurred,
  } = useContext(AppStateContext);

  const closeAlert = () => {
    setIsThemeAlertShown(false);
    setIsHeaderBlurred(false);
  };

  return (
    <AlertFrame
      itemsColor={globalItemsColor}
      closeAlert={() => {
        closeAlert();
      }}
    >
      <AlertOption
        selected={selectedTheme === "auto" || selectedTheme === undefined}
        itemsColor={globalItemsColor}
        onPress={async () => {
          closeAlert();
          setSelectedTheme("auto");
          await changeThemePreferenceAsync("auto");
        }}
      >
        System Default
      </AlertOption>
      <AlertOption
        selected={selectedTheme === "light"}
        itemsColor={globalItemsColor}
        onPress={async () => {
          closeAlert();
          setSelectedTheme("light");
          await changeThemePreferenceAsync("light");
        }}
      >
        Light
      </AlertOption>
      <AlertOption
        selected={selectedTheme === "dark"}
        itemsColor={globalItemsColor}
        onPress={async () => {
          closeAlert();
          setSelectedTheme("dark");
          await changeThemePreferenceAsync("dark");
        }}
      >
        Dark
      </AlertOption>
    </AlertFrame>
  );
}

export default OptionThemeAlert;
