import React, { useState, createContext } from "react";

export const AppStateContext = createContext();

export const AppStateProvider = (props) => {
  const [globalIconColor, setGlobalIconColor] = useState("#000000");
  const [globalBackgoundColor, setGlobalBackgoundColor] = useState("#fafafa");
  const [globalPrimaryColor, setGlobalPrimaryColor] = useState("#fefefe");
  const [globalSecondaryColor, setGlobalSecondaryColor] =
    useState("rgba(7,26,93,255)");
  const [globalTitleColor, setGlobalTitleColor] = useState("#000");
  const [globalSubtitleColor, setGlobalSubtitleColor] = useState("#999999");

  const [globalContainerStyle, setGlobalContainerStyle] = useState({
    backgroundColor: globalPrimaryColor,
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
    backgroundColor: globalBackgoundColor,
  });
  
  const contextValue = {
    globalIconColor,
    setGlobalIconColor,
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
