import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { storeDataAsync } from "../../../utils/AsyncStorageFunctions";

function HistoryHeader({
  color,
  currentTheme, // Receives the current theme to avoid calling it from context and re-render
  checkBoxShown,
  setCheckBoxShown,
  idsToDeleteList,
  setIdsToDeleteList,
  historyRegister,
  setHistoryRegister,
  selectAllElementsTrigger,
  setSelectAllElementsTrigger,
  selectAllElementsTriggerFalse,
  setSelectAllElementsTriggerFalse,
}) {
  const iconSize = 26;

  let headerColor = "rgb(7,26,93)";
  if (currentTheme === "dark") {
    headerColor = "#222222"; // Same as globalPrimaryColor
  }

  // This code checks if all elements are selected
  let elementsCounter = 0;
  for (let i = 0; i < historyRegister.length; i++) {
    elementsCounter += historyRegister[i][1].length;
  }
  const allElementsSelected = elementsCounter === idsToDeleteList.length;

  // This code checks if there was a change not registered by the button in the trigger and updates the state
  /* useEffect(() => {
    console.log("allElementsSelected useEffect")
    
    setSelectAllElementsCurrentState(allElementsSelected) // This state is used in History component
  }, [allElementsSelected]) */

  // This function restart all the states used to delete history items
  const closeButtonHandler = () => {
    setCheckBoxShown(false); // When turning off checkbox each History element will trigger a useEffect to uncheck them
    setIdsToDeleteList([]);
    setSelectAllElementsTrigger(false);
  };

  const selectAllButtonHandler = () => {

    console.log("allElementsSelected:", allElementsSelected)
    if (allElementsSelected) {
      if (selectAllElementsTrigger === undefined) {
        setSelectAllElementsTrigger(true);
      } else {
        setSelectAllElementsTrigger(!selectAllElementsTrigger);
      }
    } else {
      if (selectAllElementsTriggerFalse === undefined) {
        setSelectAllElementsTriggerFalse(true);
      } else {
        setSelectAllElementsTriggerFalse(!selectAllElementsTriggerFalse);
      }
    }
  };

  const deleteButtonHandler = () => {
    if (checkBoxShown) {
      setCheckBoxShown(false);
      deleteItemsHandler();
    } else {
      setCheckBoxShown(true);
    }
  };

  const deleteItemsHandler = async () => {
    {
      let HistoryRegisterAfterDelete = []; // Nuevo registro con los elementos no eliminados

      // Itera sobre la primera capa del registro
      for (let i = 0; i < historyRegister.length; i++) {
        let element = historyRegister[i];
        let newHistoryGroup = [element[0], []]; // [Fecha, Elementos]

        // Itera sobre la segunda capa del registro
        for (let j = 0; j < element[1].length; j++) {
          let innerElement = element[1][j];
          if (!idsToDeleteList.includes(innerElement.id)) {
            newHistoryGroup[1].push(innerElement);
          }
        }

        // Si el grupo no está vacío, agrégalo al nuevo registro
        if (newHistoryGroup[1].length !== 0) {
          HistoryRegisterAfterDelete.push(newHistoryGroup);
        }
      }

      /* console.log("HistoryRegisterAfterDelete:", HistoryRegisterAfterDelete); */

      setHistoryRegister(HistoryRegisterAfterDelete); // Establece el registro de historial en el nuevo registro

      // Actualiza el almacenamiento local
      await storeDataAsync(
        "historyRegister",
        JSON.stringify(HistoryRegisterAfterDelete)
      );

      setIdsToDeleteList([]);
    }
  };

  return (
    <View style={[styles.mainContainer, { backgroundColor: headerColor }]}>
      <View style={styles.leftContainer}>
        {checkBoxShown && (
          <Pressable
            style={styles.pressable}
            onPress={() => closeButtonHandler()}
          >
            <AntDesign name="arrowleft" size={iconSize} color="white" />
          </Pressable>
        )}
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.title}>
          {checkBoxShown ? `Selected ${idsToDeleteList.length}` : "History"}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        {checkBoxShown && (
          <Pressable style={styles.pressable} onPress={selectAllButtonHandler}>
            <MaterialCommunityIcons
              name={
                allElementsSelected
                  ? "checkbox-multiple-marked"
                  : "checkbox-multiple-blank-outline"
              }
              size={25}
              color={allElementsSelected ? color : "white"}
            />
          </Pressable>
        )}
        <Pressable style={styles.pressable} onPress={deleteButtonHandler}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={iconSize}
            color="white"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: 84,
    padding: 12,
    flexDirection: "row",
  },
  leftContainer: { flex: 1, flexDirection: "row", alignItems: "flex-end" },
  middleContainer: { width: 180 /* backgroundColor: "green" */ },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  title: {
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 24,
  },
  pressable: { padding: 4 },
});

export default React.memo(HistoryHeader); // Prevent re-rendering
