import { Image, StyleSheet, Text, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { BarCodeScanner } from "expo-barcode-scanner";
import Slider from "@react-native-community/slider";
import { useEffect, useRef, useState } from "react";
import Button from "./src/components/Button";
import ButtomBottomPad from "./src/components/ButtomBottomPad";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back); // Decimos que camra queremos usar
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0)
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null);

  // Se pide permiso a la camara
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted"); // si el status es concedido la variable es verdadera

      const camRatios = await cameraRef.current.getSupportedRatiosAsync();
      console.log(camRatios)
    })(); // Con () llamamos la función
  }, []);

  // Función para tomar una foto
  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Función para guardar imágen
  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image); // Función que guarda la imágen
        alert("Picture save!");
        setImage(null);
      } catch (error) {
        console.log(error);
      }
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
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          zoom={zoom}
          ref={cameraRef}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          ratio="16:9"
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
              padding: 30,
            }}
          >
            <Button
              icon={"retweet"}
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <Button
              icon={"flash"}
              color={
                flash === Camera.Constants.FlashMode.off ? "gray" : "white"
              }
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.torch
                    : Camera.Constants.FlashMode.off
                );
              }}
            />
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={1}
              value={zoom}
              onValueChange={(value) => {
                setZoom(value)
              }}
              minimumTrackTintColor="#06b6d4"
              maximumTrackTintColor="#cbd5e1"
            />
          </View>
        </Camera>
      ) : (
        <Image
          source={{ uri: image /*Si la imágen existe la uri de la imágen */ }}
          style={styles.camera}
        />
      )}
      {/* Con estas configuraciones de camara manejamos que funciones están activadas y la referencia a la cámara */}

      <ButtomBottomPad
        image={image}
        saveImage={saveImage}
        takePicture={takePicture}
        setImage={setImage}
      />
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
  camera: {
    aspectRatio: 9 / 16, 
    borderRadius: 20,
  },
});
