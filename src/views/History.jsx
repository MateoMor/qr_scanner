import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import TitleSpace from "../components/LayoutComponents/TitleSpace";
import HistoryElement from "../components/LayoutComponents/HistoryComponents/HistoryElement";
import DefaultContainer from "../components/LayoutComponents/DefaultContainer";
import HistoryHeader from "../components/LayoutComponents/HistoryComponents/HistoryHeader";
import FooterBanner from "../components/Ads/FooterBanner";

import { AppStateContext } from "../context/AppStateProvider";
import { useIsFocused } from "@react-navigation/native";

function History() {
  const {
    currentTheme,
    globalMainContainerStyle,
    globalBackgoundColor,
    setIsThemeAlertShown,
    setIsEngineAlertShown,
    historyRegister,
    setHistoryRegister,
    globalItemsColor,
    globalTitleColor,
    globalSubtitleStyle,
  } = useContext(AppStateContext);

  const [isMounted, setIsMounted] = useState(false);
  const [checkBoxShown, setCheckBoxShown] = useState(false); // If the checkboxes of all elements are shown

  const [idToDelete, setIdToDelete] = useState([]); // state that receives id once an element is selected
  const [idsToDeleteList, setIdsToDeleteList] = useState([]); // List of ids scheduled to be deleted

  /* NOTE: The following useStates are triggers used by HistoryHeader, they handle the activation of useEffects on HistoryElement to check all elements or uncheck them. In HistoryHeader they are triggered when selectAllButtonHandler is called, calling a diffrent trigger whether allElementsSelected is true or false */
  const [selectAllElementsTrigger, setSelectAllElementsTrigger] =
    useState(undefined); // Triggers for selectAllElementsHandler
  const [selectAllElementsTriggerFalse, setSelectAllElementsTriggerFalse] =
    useState(undefined); // Secondary trigger for selectAllElementsHandler

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

  // This function adds all the ids in the history
  const addAllIdsToDeleteList = () => {
    let ids = [];
    for (let i = 0; i < historyRegister.length; i++) {
      for (let j = 0; j < historyRegister[i][1].length; j++) {
        ids.push(historyRegister[i][1][j].id);
      }
    }
    setIdsToDeleteList(ids);
  };

  // This function adds all the ids in the history
  useEffect(() => {
    if (selectAllElementsTriggerFalse !== undefined) {
      addAllIdsToDeleteList();
    }
  }, [selectAllElementsTriggerFalse]);

  // This function unlist all the ids
  useEffect(() => {
    if (selectAllElementsTrigger !== undefined) {
      setIdsToDeleteList([]);
    }
  }, [selectAllElementsTrigger]);

  //const [layoutHeight, setLayoutHeight] = useState(600);
  const [elementsToRender, setElementsToRender] = useState(0);
  const [firstElementsRendered, setfirstElementsRendered] = useState(false); // If the first elements have been rendered

  const onScrollHandler = (event) => {
    // handles the quantity of elements to render based on the scroll height
    let newElementsToRender =
      (event.nativeEvent.layoutMeasurement.height +
        event.nativeEvent.contentOffset.y) /
      40;
    if (newElementsToRender > elementsToRender) {
      setElementsToRender(newElementsToRender);
    }
  };

  useEffect(() => {
    // Increase the first number of elements to render after the first render
    if (firstElementsRendered) {
      setElementsToRender(elementsToRender * 1.7);
    }
  }, [firstElementsRendered]);

  return (
    <View style={{ backgroundColor: globalBackgoundColor, flex: 1 }}>
      <HistoryHeader
        color={globalItemsColor}
        currentTheme={currentTheme}
        checkBoxShown={checkBoxShown}
        setCheckBoxShown={setCheckBoxShown}
        idsToDeleteList={idsToDeleteList}
        setIdsToDeleteList={setIdsToDeleteList}
        historyRegister={historyRegister}
        setHistoryRegister={setHistoryRegister}
        selectAllElementsTrigger={selectAllElementsTrigger}
        setSelectAllElementsTrigger={setSelectAllElementsTrigger}
        selectAllElementsTriggerFalse={selectAllElementsTriggerFalse}
        setSelectAllElementsTriggerFalse={setSelectAllElementsTriggerFalse}
      />

      <ScrollView
        onScroll={(event) => onScrollHandler(event)}
        onLayout={(layout) => {
          // Set the first number of elements to render depending on the layout height
          setElementsToRender(Math.ceil(layout.nativeEvent.layout.height / 80));
          setfirstElementsRendered(true);
        }}
      >
        <View style={[globalMainContainerStyle]}>
          {historyRegister.length !== 0 &&
            isMounted &&
            (() => {
              const renderedElements = [];
              let elementsRenderLimit = elementsToRender; // limit of elements to render to lazy load the view

              for (
                let i = historyRegister.length - 1;
                i >= 0 && elementsRenderLimit > 0;
                i--
              ) {
                const [date, elements] = historyRegister[i];
                // console.log("elementsRenderLimit: ", elementsRenderLimit);

                renderedElements.push(
                  <React.Fragment key={i}>
                    <TitleSpace title={date} />
                    <DefaultContainer>
                      {(() => {
                        const innerRenderedElements = [];

                        for (
                          let j = elements.length - 1;
                          j >= 0 && elementsRenderLimit > 0;
                          j--, elementsRenderLimit--
                        ) {
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
                              selectAllElementsTrigger={
                                selectAllElementsTrigger
                              }
                              selectAllElementsTriggerFalse={
                                selectAllElementsTriggerFalse
                              }
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
        </View>
        {/* This gives some space at the bottom for the footerBanner */}
        <View style={{ height: 65 }} />
      </ScrollView>
      <FooterBanner />
    </View>
  );
}

export default History;
