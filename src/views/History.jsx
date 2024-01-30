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
    globalItemsColor,
    globalTitleColor,
    globalSubtitleStyle,
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

  return (
    <View style={{ backgroundColor: globalBackgoundColor, flex: 1 }}>
      <ScrollView stickyHeaderIndices={[0]}>
        <Header title={"History"}></Header>
        <View style={[globalMainContainerStyle]}>
          {historyRegister.length !== 0 &&
            (() => {
              const renderedElements = [];

              for (let i = historyRegister.length - 1; i >= 0; i--) {
                const [date, elements] = historyRegister[i];

                renderedElements.push(
                  <React.Fragment key={i}>
                    <TitleSpace title={date} />
                    <DefaultContainer>
                      {(() => {
                        const innerRenderedElements = [];

                        for (let j = elements.length - 1; j >= 0; j--) {
                          const element = elements[j];

                          innerRenderedElements.push(
                            <HistoryElement
                              key={j}
                              type={element.type}
                              data={element.data}
                              time={element.time}
                              color={globalItemsColor}
                              titleColor={globalTitleColor}
                              subtitleStyle={globalSubtitleStyle}
                            />
                          );
                        }

                        return innerRenderedElements;
                      })()}
                    </DefaultContainer>
                  </React.Fragment>
                );
              }

              return renderedElements;
            })()}
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
