import React, { useContext, useEffect, useMemo, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";

import TitleSpace from "../components/LayoutComponents/TitleSpace";
import Header from "../components/LayoutComponents/Header";

import { AppStateContext } from "../context/AppStateProvider";
import { useIsFocused } from "@react-navigation/native";
import HistoryElement from "../components/LayoutComponents/HistoryComponents/HistoryElement";
import DefaultContainer from "../components/LayoutComponents/DefaultContainer";

function History() {
  const {
    globalMainContainerStyle,
    globalBackgoundColor,
    setIsThemeAlertShown,
    setIsEngineAlertShown,
    historyRegister,
  } = useContext(AppStateContext);

  useEffect(() => {
    console.log(historyRegister);
  }, []);

  // code that activates when the screen is focused or unfocused
  const isFocused = useIsFocused();
  useEffect(() => {
    setIsThemeAlertShown(false);
    setIsEngineAlertShown(false);
  }, [isFocused]);

  // This creates a new array with the elements in reverse order
  /* const historyRegisterCopy = [...historyRegister];
  const historyRegisterReversed = historyRegisterCopy.reverse(); */

  /* console.log(historyRegisterReversed); */

  // Agrupar elementos por fecha
  const groupedHistory = useMemo(() => Object.entries(historyRegister.slice().reverse().reduce((groups, element) => {
    console.log("useMemo")
    const date = element.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(element);
    return groups;
    
  }, {})), [historyRegister]);

  return (
    <View style={{ backgroundColor: globalBackgoundColor, flex: 1 }}>
      <ScrollView stickyHeaderIndices={[0] }>
        <Header title={"History"}></Header>
        <View style={[globalMainContainerStyle]}>
          {groupedHistory.map(([date, elements], index) => (
            <React.Fragment key={index}>
              <TitleSpace title={date} />
              <DefaultContainer>
                {elements.map((element, innerIndex) => (
                  <HistoryElement
                    key={innerIndex}
                    type={element.type}
                    data={element.data}
                    time={element.time}
                    
                  />
                ))}
              </DefaultContainer>
            </React.Fragment>
          ))}
          {/* <FlatList
            data={historyRegisterReversed}
            renderItem={({ item }) => (
              <HistoryElement
        
                type={item.type}
                data={item.data}
                time={item.time}
                unixTime={Date.now()}
              />
            )}
            keyExtractor={(item, index) => index}
          /> */}
        </View>
      </ScrollView>
    </View>
  );
}

export default History;
