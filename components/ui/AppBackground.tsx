import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";

interface AppBackgroundProps {
  children: React.ReactNode;
  safeArea?: boolean;
}

export function AppBackground({ children, safeArea = true }: AppBackgroundProps) {
  const Container = safeArea ? SafeAreaView : View;

  return (
    <LinearGradient
      colors={[Colors.creamSoft, Colors.cream, Colors.sageMint]}
      locations={[0, 0.5, 1]}
      style={styles.gradient}
    >
      <View style={styles.blob1} />
      <View style={styles.blob2} />
      <View style={styles.blob3} />
      <Container style={styles.container}>{children}</Container>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  blob1: {
    position: "absolute",
    top: -60,
    right: -40,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(156,193,183,0.2)",
  },
  blob2: {
    position: "absolute",
    top: 300,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(207,227,218,0.25)",
  },
  blob3: {
    position: "absolute",
    bottom: 100,
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(224,207,174,0.2)",
  },
});
