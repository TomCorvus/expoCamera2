import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import Camera2 from "./Camera";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Camera2 />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
