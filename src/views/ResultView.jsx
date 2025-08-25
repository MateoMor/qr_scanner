import React, { useContext, useEffect, useState } from "react";
import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";

import {
  useIsFocused,
  /* useNavigationState, */
  useRoute,
} from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-simple-toast";

import Button from "../components/Buttons/Button";
import ImageQR from "../components/LayoutComponents/ImageQR";
import FooterBanner from "../components/Ads/FooterBanner";
import MediumBanner from "../components/Ads/MediumBanner";

import { AppStateContext } from "../context/AppStateProvider";
import Header from "../components/LayoutComponents/Header";
import { getDataAsync, storeDataAsync } from "../utils/AsyncStorageFunctions";
import { getCurrentHour, getTodaysDate } from "../utils/dateFunctions";

function ResultView() {
  const {
    autoCopyToClipboard,
    globalContainerStyle,
    globalItemsColor,
    globalMainContainerStyle,
    globalPrimaryColor,
    globalBackgoundColor,
    globalTitleColor,
    historyRegister,
    setHistoryRegister,
    setIsCameraReady,
  } = useContext(AppStateContext);

  /* const navState = useNavigationState((state) => state);
  const route = useRoute(); */
  const isFocused = useIsFocused();

  let toastShown = false;

  /*useEffect(() => {
    const unsubscribe = navigation.addListener('transitionStart', (e) => {
      setIsCameraReady(true);
      console.log("Navigation")
    });
    console.log("Registered")
  
    return () => {
      console.log("Unregistered")
      unsubscribe();
    };
  }, [navigation]);*/

  /* 
  This could be used in replace of the setter in isFocused useEffect
   */
  /* useEffect(() => {
    console.log("setIsCameraReady if");
    if (navState.routes[navState.index].name === route.name) {
      setIsCameraReady(true);
      console.log("setIsCameraReady");
    }
  }, [navState.index, navState.history]); */

  useEffect(() => {
    // If auto copy is enabled copy automatically when render
    if (autoCopyToClipboard) {
      copyToClipboard();
      console.log(isDataRead)
    }
  }, [])

  const {
    params: { data, isNewData },
  } = useRoute(); //con esto pedimos los parametros enviados por ruta

  const [isDataRead, setIsDataRead] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setIsCameraReady(false); // Set IsCameraReady to false to avoid camera crashes

      // If the data is new add it to history
      if (isNewData && !isDataRead) {
        addElementToHistory();
        setIsDataRead(true);
        console.log("Added to history");
      }
    }
  }, [isFocused]);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(data);

    // Alert when copy with timeout to show again
    if (!toastShown) {
      Toast.show("Copied to clipboard!");
      toastShown = true;
      setTimeout(() => {
        toastShown = false;
      }, 2000);
    }
  };

  // Function to parse the history register from local storage and add the new element
  const addElementToHistory = async () => {
    let dataType = (await Linking.canOpenURL(data)) ? "URL" : "Text";

    // Get the last id
    let lastId = 0;

    if (historyRegister.length !== 0) {
      lastId =
        historyRegister[historyRegister.length - 1][1][
          historyRegister[historyRegister.length - 1][1].length - 1
        ].id + 1;
    }

    console.log("Last id: ", lastId);

    const todaysDate = getTodaysDate();
    let newHistoryRegisterArray = [...historyRegister];

    // [Date, Elements]
    const newRegister = {
      type: dataType,
      data: data,
      time: getCurrentHour(),
      id: lastId,
    };

    // Verificar si el último elemento del array tiene la misma fecha que hoy
    if (
      newHistoryRegisterArray.length > 0 &&
      newHistoryRegisterArray[newHistoryRegisterArray.length - 1][0] ===
        todaysDate
    ) {
      // Agregar el nuevo elemento al último conjunto de elementos
      newHistoryRegisterArray[newHistoryRegisterArray.length - 1][1].push(
        newRegister
      );
    } else {
      // Agregar un nuevo conjunto de elementos para la fecha de hoy
      newHistoryRegisterArray.push([todaysDate, [newRegister]]);
    }

    // Actualizar el estado
    setHistoryRegister(newHistoryRegisterArray);

    // Almacenar los datos en AsyncStorage
    await storeDataAsync(
      "historyRegister",
      JSON.stringify(newHistoryRegisterArray)
    );
  };

  return (
    <React.Fragment>
      <Header title="Details" />
      <ScrollView
        style={{ backgroundColor: globalBackgoundColor }}
        scrollEnabled={true}
      >
        <View style={[globalMainContainerStyle]}>
          <View
            style={[
              styles.text_container,
              globalContainerStyle,
              { backgroundColor: globalPrimaryColor },
            ]}
          >
            <Text style={[styles.text, { color: globalTitleColor }]}>
              {data}
            </Text>
            <Button
              icon={"content-copy"}
              library={"MaterialIcons"}
              color={globalItemsColor}
              onPress={async () => {
                copyToClipboard();
                /* const thisData = await getDataAsync("historyRegister"); */
              }}
            />
          </View>
          {/* QR code generator */}
          <ImageQR
            data={data}
            containerStyle={[
              globalContainerStyle,
              { backgroundColor: globalPrimaryColor },
            ]}
          />
          <MediumBanner />
        </View>
        {/* This gives some space at the bottom for the footerBanner */}
        <View style={{ height: 65 }} />
      </ScrollView>
      <FooterBanner />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  text_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  text: { width: "84%", fontWeight: "400", fontSize: 15 },
});

export default ResultView;
