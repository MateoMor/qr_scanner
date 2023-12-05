import { Image, StyleSheet, Text, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useRef, useState } from "react";
import Button from "./src/components/Button";
import ButtomBottomPad from "./src/components/ButtomBottomPad";

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back); // Decimos que camra queremos usar
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  // Se pide permiso a la camara
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted"); // si el status es concedido la variable es verdadera
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
          ref={cameraRef}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    paddingBottom: 15,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
});
