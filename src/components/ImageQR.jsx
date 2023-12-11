import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import { QRCode } from "react-native-custom-qr-codes-expo";
import { captureRef } from "react-native-view-shot";
import Toast from "react-native-simple-toast";

// Librerías apra descargar la imágen en el dispositivo
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import Button from "./Button";

function ImageQR({ data, containerStyle, iconsColor }) {
  let toastShown = false;
  const [isMounted, setIsMounted] = useState(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();

  useEffect(() => {
    // useEffect para montar el QR solo despues de cambiar de ruta
    setIsMounted(true); // El componente está montado
    return () => {
      setIsMounted(false); // El componente está desmontado
    };
  }, []);

  const onSaveImageAsync = async () => {

    

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

      await MediaLibrary.createAssetAsync(imageUri)

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
      if (!toastShown) {
        Toast.show("QR Code Was Not Downloaded");
        toastShown = true;
        setTimeout(() => {
          toastShown = false;
        }, 2000);
      }
    }
  };

  if (status === null) {
    requestPermission();
  }

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
