import { useEffect, useRef, useState } from "react";
import { Alert, Linking, StyleSheet, View } from "react-native";

import { QRCode } from "react-native-custom-qr-codes-expo";
import { captureRef } from "react-native-view-shot";
import Toast from "react-native-simple-toast";
import * as ImagePicker from "expo-image-picker";

// Librerías apra descargar la imágen en el dispositivo
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import Button from "./Button";

function ImageQR({ data, containerStyle, iconsColor }) {
  let toastShown = false;
  const [isMounted, setIsMounted] = useState(false);
  const imageRef = useRef();

  useEffect(() => {
    // useEffect para montar el QR solo despues de cambiar de ruta
    setIsMounted(true); // El componente está montado
    return () => {
      setIsMounted(false); // El componente está desmontado
    };
  }, []);

  const onSaveImageAsync = async () => {
    // Method to request permission slightly different from the one used in Scanner.jsx to requiest camera acces

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync(); // Pide permiso al usuario para acceder a las galeria de imagenes
    if (permissionResult.granted === false) {
      Alert.alert("Media Permission", "Need media permission to save qr code", [
        {
          text: "Cancel",
        },
        {
          text: "go to settings",
          onPress: () => {
            Linking.openSettings();
          },
        },
      ]);
      return;
    }

    try {
      const imageUri = await captureRef(imageRef, {
        height: 440,
        format: "png",
        quality: 1,
      });

      /* ****************** INTENTO DE CAMBIAR EL NOMBRE DE LA IMAGEN ANTES DE GUARDARLA ****************** */
      /* const dataNamePath = data.split(" ").join("_");

      localuri =
        FileSystem.documentDirectory + dataNamePath + "_" + Date.now() + ".png";

      await FileSystem.moveAsync({ from: imageUri, to: localuri }); 
      
      let asset = await MediaLibrary.createAssetAsync(imageUri);
      */

      await MediaLibrary.createAssetAsync(imageUri);

      /* await MediaLibrary.createAlbumAsync("Download", asset); */

      if (imageUri) {
        if (!toastShown) {
          Toast.show("QR Code Downloaded!");
          toastShown = true;
          setTimeout(() => {
            toastShown = false;
          }, 2000);
        }
      }
    } catch (e) {
      console.log(e);
      if (!toastShown) {
        Toast.show("QR Code Was Not Downloaded");
        toastShown = true;
        setTimeout(() => {
          toastShown = false;
        }, 2000);
      }
    }
  };

  return (
    <View
      style={[containerStyle /* Estilos heredados */, styles.mainContainer]}
    >
      <View ref={imageRef} collapsable={false} style={styles.qrContainer}>
        {isMounted && <QRCode content={data} />}
      </View>
      <View>
        <Button
          icon={"download-outline"}
          library={"Ionicons"}
          color={iconsColor}
          onPress={onSaveImageAsync}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
  qrContainer: {
    backgroundColor: "white",
  },
});

export default ImageQR;
