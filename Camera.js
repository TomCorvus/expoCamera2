import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";

export default function Camera2() {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);

  const camera = useRef(null);

  const takePhoto = async () => {
    if (!camera.current) return;

    await camera.current
      .takePictureAsync({ skipProcessing: true })
      .then((photo) => {
        setPhoto(photo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      {!photo ? (
        <>
          <Camera
            ref={camera}
            style={styles.camera}
            type={CameraType.back}
            useCamera2Api
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => takePhoto()}>
              <Text style={styles.text}> Take </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Image
            resizeMode="contain"
            style={{ flex: 1 }}
            source={{ uri: photo.uri }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setPhoto(null)}
            >
              <Text style={styles.text}> Back </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    backgroundColor: "black",
  },
  buttonContainer: {
    backgroundColor: "transparent",
    margin: 20,
  },
  button: {
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "black",
  },
});
