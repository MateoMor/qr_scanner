import { useState, createContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import { getDataAsync, storeDataAsync } from "../utils/AsyncStorageFunctions";

export const AppStateContext = createContext();

export const AppStateProvider = (props) => {

  // --------------------------- THEME --------------------------- //
  const deviceTheme = useColorScheme(); // Is necesary configure expo: {"userInterfaceStyle": "automatic"}, in app.json for useColorScheme() to work

  // Colors style from https://material.io/design/color/dark-theme.html#ui-application
  const darkThemeSetter = () => {
    setGlobalPrimaryColor("#1C1C1C");
    setheaderColor("#1C1C1C"); // Same color as globalPrimaryColor
    setGlobalBackgoundColor("#121212");
    setGlobalTitleColor("rgba(255, 255, 255, 0.87)");
    setGlobalSubtitleColor("rgba(255, 255, 255, 0.60)");
  };

  const lightThemeSetter = () => {
    setGlobalPrimaryColor("#FFFFFF");
    setheaderColor("rgb(7,26,93)");
    setGlobalBackgoundColor("#FAFAFA");
    setGlobalTitleColor("rgba(0, 0, 0, 0.87)");
    setGlobalSubtitleColor("rgba(0, 0, 0, 0.60)");
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
  }

  // Function to change the theme preference. values: auto, light, dark
  const changeThemePreference = async (value) => {
    await storeDataAsync("themePreference", value);
    changeTheme(value);
  };

  // --------------------------- /THEME --------------------------- //

  useEffect(() => {
    // Asks which theme is in use at the beggining of the app and changes it to that
    (async () => {
      const themePreference = await getDataAsync("themePreference");
      changeTheme(themePreference);
    })();
  }, []);

  const [globalBackgoundColor, setGlobalBackgoundColor] = useState("#fafafa");
  const [globalPrimaryColor, setGlobalPrimaryColor] = useState("#fefefe");
  const [globalSecondaryColor, setGlobalSecondaryColor] =
    useState("rgba(7,26,93,255)");
  const [headerColor, setheaderColor] = useState("rgb(7,26,93)");
  const [globalIconColor, setGlobalIconColor] = useState("aqua");
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
    changeThemePreference, // Function
    globalIconColor,
    setGlobalIconColor,
    globalBackgoundColor,
    setGlobalBackgoundColor,
    globalPrimaryColor,
    setGlobalPrimaryColor,
    globalSecondaryColor,
    setGlobalSecondaryColor,
    headerColor,
    setheaderColor,
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
