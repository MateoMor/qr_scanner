import { Alert, Linking, StyleSheet, Vibration, View } from "react-native";
import { useContext, useEffect, useRef, useState } from "react";

import { CameraView, useCameraPermissions } from "expo-camera";
import ImagePicker from "expo-image-picker";
import Toast from "react-native-simple-toast";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useAudioPlayer } from 'expo-audio';

import Button from "../components/Buttons/Button";
import ScannerAnimation from "../components/LayoutComponents/ScannerAnimation";
import BottomPad from "../components/Buttons/BottomPad";
import ButtonText from "../components/Buttons/ButtonText";
import { StatusBar } from "expo-status-bar";

import { AppStateContext } from "../context/AppStateProvider";
import FooterBanner from "../components/Ads/FooterBanner";

const audioSource = require('../../assets/beep.mp3');

function Scanner() {
  
  const { navigate } = useNavigation(); // Llamamos al hook de navigation

  const isFocused = useIsFocused(); // Hook para saber cuando montar y desmontar la cámara

  const { vibration, beep, isCameraReady, setIsCameraReady } =
    useContext(AppStateContext);

  const [permission, requestPermission] = useCameraPermissions();
  const [selectedImage, setSelectedImage] = useState(null);
  const [facing, setFacing] = useState("back");
  const [torch, setTorch] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null);

  const player = useAudioPlayer(audioSource);

  // Se pide permiso a la camara
  useEffect(() => {
    (async () => {
      if (!permission) {
        await requestPermission();
      } else {
        setIsCameraReady(permission.granted);
      }
    })(); 
  }, [permission, isFocused]);

  useEffect(() => {
    if (permission?.granted) {
      setIsCameraReady(true);
    }
  }, [permission]);

  // Function to navigate to the information screen
  const QRscannedNav = (data) => {
    setTorch(false);
    setZoom(0);
    setIsCameraReady(false);
    navigate("Details", { data, isNewData: true }); 
  };

  const playBeep = async () => {
    player.play(); // Reproduce el sonido
  };

  // Function what receive barcode info and calls navigate to other route
  const barcodeScanned = async (type, data) => {
    if (scanned) return; 
    setScanned(true);

    if (beep) {
      player.play();
    }
    if (vibration) {
      Vibration.vibrate(100);
    }
    
    QRscannedNav(data);
    setTimeout(() => setScanned(false), 2000);
  };

  // Function to select an image
  let pickImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1, 
    });

    if (pickerResult.canceled == true) {
      return;
    } else {
      setSelectedImage({ localUri: pickerResult.assets[0].uri });
      try {
        // Se busca un qr en la imágen
        /* const scannedResults = await BarCodeScanner.scanFromURLAsync(
          pickerResult.assets[0].uri
        );

        const imageData = scannedResults[0].data;
        const imageType = scannedResults[0].type;

        barcodeScanned(imageType, imageData); */
      } catch (error) {
        Toast.show("No Barcode Code Found");
      }
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    if (isFocused && !scanned) {
      barcodeScanned(type, data);
    }
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
            Linking.openSettings(); 
            setTimeout(async () => {
              if (requestPermission) await requestPermission();
            }, 1500);
          },
        },
      ]
    );
  };

  // View to show if the app doesn't have camera permission
  if (!permission?.granted) {
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
          onPress={requestPermission}
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
            setFacing(
              facing === 'back' ? 'front' : 'back'
            );
          }}
        />
        <Button
          icon={
            !torch ? "flash-off" : "flash"
          }
          onPress={() => {
            setTorch(!torch);
            console.log(selectedImage);
          }}
        />
        <Button icon="images" onPress={() => pickImage()} />
      </View>
      {isCameraReady && (
        <CameraView
          style={styles.camera}
          facing={facing}
          enableTorch={torch}
          zoom={zoom}
          ref={cameraRef}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417", "ean13", "code128", "code39", "upc_e", "upc_a", "ean8", "itf14", "codabar", "aztec", "datamatrix"],
          }}
          onCameraReady={() => {
            console.log("Camera Ready");
          }}
          onMountError={(error) => {
            console.log("onMountError", error);
          }}
        ></CameraView>
      )}

      <BottomPad zoom={zoom} setZoom={setZoom} />

      <ScannerAnimation />
    
      <FooterBanner />
      
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
  }
});

export default Scanner;
