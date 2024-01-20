import { useContext, useEffect, useRef, useState } from "react";
import { Alert, Linking, StyleSheet, View } from "react-native";

import QRCode from "react-native-qrcode-svg";
import { captureRef } from "react-native-view-shot";
import Toast from "react-native-simple-toast";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

// Librerías apra descargar la imágen en el dispositivo
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import Button from "../Buttons/Button";
import { AppStateContext } from "../../context/AppStateProvider";

function ImageQR({ data, containerStyle }) {
  const { globalItemsColor, searchEngine, autoSearch } =
    useContext(AppStateContext);

  let toastShown = false;
  const [isMounted, setIsMounted] = useState(false);
  const imageRef = useRef();
  const [isDataURL, setIsDataURL] = useState(false);

  useEffect(() => {
    // useEffect para montar el QR solo después de cambiar de ruta
    setIsMounted(true); // El componente está montado

    // Función para preguntar si si data es una URL valida y la asigna
    async function canDataBeOpen() {
      const canOpen = await Linking.canOpenURL(data);
      setIsDataURL(canOpen);

      // Si autosearch está habilitado y si la data es una URL la abre
      if (autoSearch) {
        if (canOpen) {
          Linking.openURL(data);
        }
      }
    }

    // Llamada a la función asincrónica
    canDataBeOpen();
  }, [data]); // Asegúrate de incluir 'data' como una dependencia si lo usas dentro de la función

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

  // Función para buscar un string en el browser
  const SearchInBrowser = async (searchString, engine) => {
    try {
      const encodeURI = encodeURIComponent(searchString);

      const searchUrl = `https://www.${engine}.com/search?q=${encodeURI}`;

      console.log(searchUrl);

      // Abre el navegador con la barra de búsqueda
      await Linking.openURL(searchUrl);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para compartir la imagen
  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      // Se comprueba si el dispositivo movil tiene la api para compartir
      alert("Sharing, is not available on your platform");
      return;
    }

    try {
      const imageUri = await captureRef(imageRef, {
        height: 440,
        format: "png",
        quality: 1,
      });

      await Sharing.shareAsync(imageUri);
    } catch (e) {
      console.log(e);

      Toast.show("QR share problem");
    }
  };

  return (
    <View
      style={[containerStyle /* Estilos heredados */, styles.mainContainer]}
    >
      <View ref={imageRef} collapsable={false} style={styles.qrContainer}>
        {isMounted && <QRCode value={data} size={230} />}
      </View>
      <View style={styles.buttonsContainer}>
        {/* Si se puede abrir la url se usará el método Linking.openURL() de lo contrario se buscará en el navegador*/}
        {isDataURL ? (
          <Button
            icon={"link-outline"}
            library={"Ionicons"}
            color={globalItemsColor}
            size={32}
            onPress={() => Linking.openURL(data)}
          />
        ) : (
          <Button
            icon={"web"}
            library={"MaterialCommunityIcons"}
            color={globalItemsColor}
            size={32}
            onPress={() => SearchInBrowser(data, searchEngine || "google")}
          />
        )}
        <Button
          icon={"download-outline"}
          library={"Ionicons"}
          color={globalItemsColor}
          size={32}
          onPress={onSaveImageAsync}
        />
        <Button
          icon={"sharealt"}
          library={"AntDesign"}
          color={globalItemsColor}
          size={32}
          onPress={openShareDialog}
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
    padding: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 10,
    gap: 52,
  },
});

export default ImageQR;
