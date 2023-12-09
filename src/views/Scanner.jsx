import { StyleSheet, Text, Vibration, View } from "react-native";
import { useEffect, useRef, useState } from "react";

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { BarCodeScanner } from "expo-barcode-scanner";

import Button from "../components/Button";
import ScannerAnimation from "../components/ScannerAnimation";
import BottomPad from "../components/BottomPad";
import { useNavigation, useIsFocused } from "@react-navigation/native";

function Scanner() {
  const { navigate } = useNavigation(); // Llamamos al hook de navigation
  const isFocused = useIsFocused(); // Hook para saber cuando montar y desmontar la cámara

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null);

  // Se pide permiso a la camara
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted"); // si el status es concedido la variable es verdadera

      //const camRatios = await cameraRef.current.getSupportedRatiosAsync();
      //console.log(camRatios);
    })(); // Con () llamamos la función
  }, []);

  const QRscannedNav = (data) => {
    navigate("Detail", { data }); // Recibe el nombre de la pantalla definida en el rooteador y llama al compomente con los argumentos dados
  };

  const barcodeScanned = (type, data) => {
    Vibration.vibrate(100);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    QRscannedNav(data);
  };

  // Función para seleccionar una imagen
  let pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync(); // Pide permiso al usuario para acceder a las galeria de imagenes
    if (permissionResult.granted === false) {
      alert("Permission to acces media library is required");
      return;
    }

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
        alert("No QR Code Found");
      }
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    barcodeScanned(type, data);
  };

  if (hasCameraPermission === false) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsPad}>
        <Button
          icon={"camera-reverse"}
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
            setFlash(
              flash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            );
            console.log(selectedImage);
          }}
        />
        <Button icon={"images"} onPress={() => pickImage()} />
      </View>
      {isFocused && (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          zoom={zoom}
          ref={cameraRef}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          ratio="16:9"
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
    paddingHorizontal: 30,
    padding: 30,
    zIndex: 10,
  },
  camera: {
    height: "100%",
    aspectRatio: 9 / 16,
    borderRadius: 20,
  },
});

export default Scanner;
