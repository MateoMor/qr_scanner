import { Image, StyleSheet, Text, View } from "react-native";
import { useEffect, useRef, useState } from "react";

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { BarCodeScanner } from "expo-barcode-scanner";
import Slider from "@react-native-community/slider";
import { StatusBar } from "expo-status-bar";

import Button from "./src/components/Button";
import ButtomBottomPad from "./src/components/ButtomBottomPad";
import ScannerAnimation from "./src/components/ScannerAnimation";

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back); // Decimos que camra queremos usar
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

      const camRatios = await cameraRef.current.getSupportedRatiosAsync();
      console.log(camRatios);
    })(); // Con () llamamos la función
  }, []);

  // Función para seleccionar una imagen
  let openImagePickerAsync = async () => {
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
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
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
        <Button icon={"images"} onPress={() => openImagePickerAsync()} />

        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          value={zoom}
          onValueChange={(value) => {
            setZoom(value);
          }}
          minimumTrackTintColor="#06b6d4"
          maximumTrackTintColor="#cbd5e1"
        />
      </View>

      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        zoom={zoom}
        ref={cameraRef}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        ratio="16:9"
      ></Camera>

      <Image
        source={{ uri: selectedImage?.localUri }}
        style={{ width: 200, height: 200 }}
      />
      {/* Con estas configuraciones de camara manejamos que funciones están activadas y la referencia a la cámara */}
      <ScannerAnimation />
      <StatusBar style="light" />
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
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    padding: 30,
    zIndex: 10,
  },
  camera: {
    aspectRatio: 9 / 16,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
});
