import React, { useState, createContext, useEffect } from "react";
import { useColorScheme } from "react-native";

export const AppStateContext = createContext();

export const AppStateProvider = (props) => {
  const [themePreference, setThemePreference] = useState("dark"); // options: auto, light, dark
  const colorTheme = useColorScheme();

  useEffect(() => {
    // Colors from https://material.io/design/color/dark-theme.html#ui-application
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

    // Asks wich theme is in use
    switch (themePreference) {
      case "auto":
        colorTheme === "dark" ? darkThemeSetter() : lightThemeSetter();
        break;
      case "light":
        lightThemeSetter();
        break;
      case "dark":
        darkThemeSetter();
        break;
      default:
        lightThemeSetter();
        break;
    }
  }, [colorTheme, themePreference]);

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
    flex: 1,
    gap: 15,
    padding: 15,
    /* backgroundColor: globalBackgoundColor, */
  });

  const contextValue = {
    themePreference,
    setThemePreference,
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
