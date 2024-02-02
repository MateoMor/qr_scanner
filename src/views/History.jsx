import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import TitleSpace from "../components/LayoutComponents/TitleSpace";
import Header from "../components/LayoutComponents/Header";

import { AppStateContext } from "../context/AppStateProvider";
import { useIsFocused } from "@react-navigation/native";
import HistoryElement from "../components/LayoutComponents/HistoryComponents/HistoryElement";
import DefaultContainer from "../components/LayoutComponents/DefaultContainer";
import HistoryHeader from "../components/LayoutComponents/HistoryComponents/HistoryHeader";

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

  const [isMounted, setIsMounted] = useState(false);
  const [checkBoxShown, setCheckBoxShown] = useState(false); // If the checkboxes of all elements are shown

  const [idToDelete, setIdToDelete] = useState([]); // state that receives id once an element is selected
  const [idsToDeleteList, setIdsToDeleteList] = useState([]); // List of ids scheduled to be deleted

  useEffect(() => {
    console.log(historyRegister);
    setIsMounted(true);
  }, []);

  // code that activates when the screen is focused or unfocused
  const isFocused = useIsFocused();
  useEffect(() => {
    setIsThemeAlertShown(false);
    setIsEngineAlertShown(false);
  }, [isFocused]);

  // This list or unlist the ids received with idToDelete
  useEffect(() => {
    if (idToDelete[0] !== undefined) {
      if (idsToDeleteList.includes(idToDelete[0])) {
        // If the id is already in the list, remove it
        setIdsToDeleteList((idsToDeleteList) =>
          idsToDeleteList.filter((id) => id !== idToDelete[0])
        );
      } else {
        // If the id is not in the list, add it
        setIdsToDeleteList((idsToDeleteList) => [
          ...idsToDeleteList,
          idToDelete[0],
        ]);
      }
    }
    console.log("idToDelete:", idToDelete[0]);

    console.log("idsToDeleteList:", idsToDeleteList);
  }, [idToDelete]);

  return (
    <View style={{ backgroundColor: globalBackgoundColor, flex: 1 }}>
      <HistoryHeader
        checkBoxShown={checkBoxShown}
        setCheckBoxShown={setCheckBoxShown}
        setIdsToDeleteList={setIdsToDeleteList}
      />
      <ScrollView>
        <View style={[globalMainContainerStyle]}>
          {historyRegister.length !== 0 &&
            isMounted &&
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
                              key={element.id}
                              id={element.id}
                              type={element.type}
                              data={element.data}
                              time={element.time}
                              color={globalItemsColor}
                              titleColor={globalTitleColor}
                              subtitleStyle={globalSubtitleStyle}
                              setIdToDelete={setIdToDelete}
                              checkBoxShown={checkBoxShown}
                              setCheckBoxShown={setCheckBoxShown}
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
