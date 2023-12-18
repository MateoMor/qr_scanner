import React, { useState } from "react";

export const AppStateContext = React.createContext();

export const AppStateProvider = (props) => {
  const [iconColor, setIconColor] = useState("#000000");

  const contextValue = {
    iconColor,
    setIconColor,
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {props.children}
    </AppStateContext.Provider>
  );
};
