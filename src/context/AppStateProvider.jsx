import { useState, createContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import { getDataAsync, storeDataAsync } from "../utils/AsyncStorageFunctions";

export const AppStateContext = createContext();

export const AppStateProvider = (props) => {
  // --------------------------- THEME --------------------------- //
  const deviceTheme = useColorScheme(); // Is necesary configure expo: {"userInterfaceStyle": "automatic"}, in app.json for useColorScheme() to work

  const [currentTheme, setCurrentTheme] = useState("light"); // UseState to know when the theme changes (light or dark)

  const [isAlertShown, setIsAlertShown] = useState(false); // UseState to know when the header should be blured

  // Colors style from https://material.io/design/color/dark-theme.html#ui-application
  const darkThemeSetter = () => {
    setGlobalPrimaryColor("#1C1C1C");
    setGlobalBackgoundColor("#121212");
    setGlobalTitleColor("rgba(255, 255, 255, 0.87)");
    setGlobalSubtitleColor("rgba(255, 255, 255, 0.60)");
    setCurrentTheme("dark");
  };

  const lightThemeSetter = () => {
    setGlobalPrimaryColor("#FFFFFF");
    setGlobalBackgoundColor("#FAFAFA");
    setGlobalTitleColor("rgba(0, 0, 0, 0.87)");
    setGlobalSubtitleColor("rgba(0, 0, 0, 0.60)");
    setCurrentTheme("light");
  };

  // Function thath changes the theme (Not change preference)
  const changeTheme = (theme) => {
    if (theme === "auto" || theme === undefined) {
      deviceTheme === "dark" ? darkThemeSetter() : lightThemeSetter();
    } else if (theme === "dark") {
      darkThemeSetter();
    } else if (theme === "light") {
      lightThemeSetter();
    }
  };

  // Function to change the theme preference. values: auto, light, dark
  const changeThemePreferenceAsync = async (value) => {
    await storeDataAsync("themePreference", value);
    changeTheme(value);
  };

  // --------------------------- /THEME --------------------------- //

  // Function to change the items color in async storage and app state
  const changeItemsColor = (color) => {
    setGlobalItemsColor(color);
    storeDataAsync("itemsColor", color);
  };

  const toggleVibrationState = async () => {
    setVibration(!vibration);
    newVibrationState = vibration ? "false" : "true";
    await storeDataAsync("vibration", newVibrationState);
  };

  const toggleBeepState = async () => {
    setBeep(!beep);
    newBeepState = beep ? "false" : "true";
    await storeDataAsync("beep", newBeepState);
  };

  const toggleAutoCopyToClipboard = async () => {
    setAutoCopyToClipboard(!autoCopyToClipboard);
    const newAutoCopyToClipboardState = autoCopyToClipboard ? "false"  : "true";
    await storeDataAsync("autoCopyToClipboard", newAutoCopyToClipboardState);
  }

  // Asks async storaged properties at the beggining of the app
  useEffect(() => {
    (async () => {
      /* THEME */
      const themePreference = await getDataAsync("themePreference");
      changeTheme(themePreference);

      /* COLORS */
      let storedItemsColor = await getDataAsync("itemsColor");
      if (storedItemsColor === undefined) {
        storedItemsColor = "#1973E9";
        await storeDataAsync("itemsColor", storedItemsColor); // Stores color in async storage
      }
      setGlobalItemsColor(storedItemsColor);

      /* VIBRATION and SOUND */
      let storedVibration = await getDataAsync("vibration");
      if (storedVibration === undefined) {
        console.log("second")
        storedVibration = "true";
        await storeDataAsync("vibration", storedVibration);
      }
      setVibration(storedVibration === "true"); // converts string "true" of "false" in boolean

      let storedBeep = await getDataAsync("beep");
      if (storedBeep === undefined) {
        storedBeep = "false";
        await storeDataAsync("beep", storedBeep);
      }
      setBeep(storedBeep === "true");

      /* AUTO COPY TO CLIPBOARD */
      let storedAutoCopyToClipboard = await getDataAsync("autoCopyToClipboard");
      if (storedAutoCopyToClipboard === undefined) {
        storedAutoCopyToClipboard = "false";
        await storeDataAsync("autoCopyToClipboard", storedAutoCopyToClipboard);
      }
      setAutoCopyToClipboard(storedAutoCopyToClipboard === "true");
    })();
  }, [deviceTheme]);

  // the booleans are strings because async storage only accepts strings
  const [vibration, setVibration] = useState(true);
  const [beep, setBeep] = useState(false);
  const [autoCopyToClipboard, setAutoCopyToClipboard] = useState(false)

  const [globalBackgoundColor, setGlobalBackgoundColor] = useState("#fafafa");
  const [globalPrimaryColor, setGlobalPrimaryColor] = useState("#fefefe");
  const [globalSecondaryColor, setGlobalSecondaryColor] =
    useState("rgba(7,26,93,255)");
  const [globalItemsColor, setGlobalItemsColor] = useState("#1973E9");
  const [globalTitleColor, setGlobalTitleColor] = useState("#000");
  const [globalSubtitleColor, setGlobalSubtitleColor] = useState("#999999");

  const [globalContainerStyle, setGlobalContainerStyle] = useState({
    /* backgroundColor: globalPrimaryColor,  */
    padding: 14,
    borderRadius: 14,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  });

  const [globalMainContainerStyle, setGlobalMainContainerStyle] = useState({
    /* backgroundColor: globalBackgoundColor, */
    flex: 1,
    gap: 15,
    padding: 15,
  });

  const contextValue = {
    changeThemePreferenceAsync, // Function
    changeItemsColor, // Function
    toggleVibrationState, // Function
    toggleBeepState, // Function
    toggleAutoCopyToClipboard, // Function
    vibration,
    beep,
    autoCopyToClipboard,
    currentTheme,
    setCurrentTheme,
    isAlertShown,
    setIsAlertShown,
    globalItemsColor,
    setGlobalItemsColor,
    globalBackgoundColor,
    setGlobalBackgoundColor,
    globalPrimaryColor,
    setGlobalPrimaryColor,
    globalSecondaryColor,
    setGlobalSecondaryColor,
    globalTitleColor,
    setGlobalTitleColor,
    globalSubtitleColor,
    setGlobalSubtitleColor,
    globalContainerStyle,
    globalMainContainerStyle,
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {props.children}
    </AppStateContext.Provider>
  );
};
