import { Alert, Linking, StyleSheet, Vibration, View } from "react-native";
import { useContext, useEffect, useRef, useState } from "react";

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { BarCodeScanner } from "expo-barcode-scanner";
import Toast from "react-native-simple-toast";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Audio } from "expo-av";

import Button from "../components/Buttons/Button";
import ScannerAnimation from "../components/LayoutComponents/ScannerAnimation";
import BottomPad from "../components/Buttons/BottomPad";
import ButtonText from "../components/Buttons/ButtonText";
import { StatusBar } from "expo-status-bar";

import { AppStateContext } from "../context/AppStateProvider";

function Scanner() {
  const { navigate } = useNavigation(); // Llamamos al hook de navigation

  const isFocused = useIsFocused(); // Hook para saber cuando montar y desmontar la cámara

  const { vibration, beep, isCameraReady, setIsCameraReady } = useContext(AppStateContext);

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null);
  const [scanSound, setScanSound] = useState(null);

  // Se pide permiso a la camara
  useEffect(
    () => {
      (async () => {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === "granted"); // si el status es concedido el estado es verdadero

        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/beep.mp3"),
          { playThroughEarpieceAndroid: true }
        ); // Pide el sonido del scanner

        setScanSound(sound);

        //const camRatios = await cameraRef.current.getSupportedRatiosAsync();
        //console.log(camRatios);
      })(); // Con () llamamos la función
    },
    [
      isFocused,
    ] /* Con isFocused la función se ejecutará cada vez que se entre a la pantalla */
  );

  // Function to navigate to the information screen
  const QRscannedNav = (data) => {
    setIsCameraReady(false);
    navigate("Details", { data }); // Recibe el nombre de la pantalla definida en el rooteador y llama al compomente con los argumentos dados
  };

  const playBeep = async () => {
    await sound.playAsync(); // Reproduce el sonido
  };

  // Function what receive barcode info and calls navigate to other route
  const barcodeScanned = async (type, data) => {
    if (beep) {
      scanSound.replayAsync(); // Beep sound is played
    }
    if (vibration) {
      Vibration.vibrate(100);
    }
    // Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    QRscannedNav(data);
  };

  // Function to select an image
  let pickImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1, // Importante para no tener un warning
    });

    if (pickerResult.canceled == true) {
      return;
    } else {
      setSelectedImage({ localUri: pickerResult.assets[0].uri });
      try {
        // Se busca un qr en la imágen
        const scannedResults = await BarCodeScanner.scanFromURLAsync(
          pickerResult.assets[0].uri
        );

        const imageData = scannedResults[0].data;
        const imageType = scannedResults[0].type;

        barcodeScanned(imageType, imageData);
      } catch (error) {
        Toast.show("No Barcode Code Found");
      }
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    barcodeScanned(type, data);
  };

  // Function to promp user for camera permission
  const requestCameraPermissionFromSettings = () => {
    Alert.alert(
      "No Camera Permission",
      "Need camera permission to scan with camera",
      [
        {
          text: "Cancel",
        },
        {
          text: "go to settings",
          onPress: () => {
            Linking.openSettings(); /* Se abre la configuración */
            /* Function to ask if hasPermission === "granted" after one second and force a reload if indeed it is, surely there's a better way but i don't know it */
            setTimeout(async () => {
              const cameraStatus = await Camera.getCameraPermissionsAsync(); // Se si se tiene permiso de cámara
              setHasCameraPermission(cameraStatus.status === "granted");
            }, 1500);
          },
        },
      ]
    );
  };

  // View to show if the app doesn't have camera permission
  if (hasCameraPermission === false) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <ButtonText
          text="Scan with Camera"
          color="green"
          icon="camera-alt"
          library="MaterialIcons"
          onPress={requestCameraPermissionFromSettings}
        />
        <ButtonText
          text="Scan from Gallery"
          color="blue"
          icon="images"
          library="Ionicons"
          onPress={pickImage}
        />
        <StatusBar style="dark" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsPad}>
        <Button
          icon="camera-reverse"
          onPress={() => {
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            );
          }}
        />
        <Button
          icon={
            flash === Camera.Constants.FlashMode.off ? "flash-off" : "flash"
          }
          onPress={() => {
            // Quiero que en esta linea la camara se pause
            setFlash(
              flash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            );
            console.log(selectedImage);
          }}
        />
        <Button icon="images" onPress={() => pickImage()} />
        <Button
          icon="settings"
          library="MaterialIcons"
          onPress={() => navigate("Settings")}
        />
      </View>
      {isCameraReady && (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          zoom={zoom}
          ref={cameraRef}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          ratio="16:9"
          onCameraReady={() => {
            console.log("Camera Ready");
          }}
          onMountError={(error) => {
            console.log(error);
          }}
        ></Camera>
      )}

      <BottomPad zoom={zoom} setZoom={setZoom} />

      <ScannerAnimation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  buttonsPad: {
    position: "absolute",
    top: "5%",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 30,
    /* padding: 30, */
    zIndex: 10,
  },
  camera: {
    height: "100%",
    aspectRatio: 9 / 16,
    borderRadius: 20,
  },
});

export default Scanner;
