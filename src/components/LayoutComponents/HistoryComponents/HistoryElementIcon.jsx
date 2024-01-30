import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React from "react";

const HistoryElementIcon = ({ color, type }) => {
  let iconSize = 34;
  return (
    <React.Fragment>
      {type === "URL" ? (
        <FontAwesome5 name="link" size={iconSize} color={color} />
      ) : (
        <MaterialIcons name="text-fields" size={iconSize} color={color} />
      )}
    </React.Fragment>
  );
};

export default HistoryElementIcon;
