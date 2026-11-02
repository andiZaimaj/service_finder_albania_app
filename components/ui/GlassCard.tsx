import React from "react";
import { View, StyleSheet, type ViewStyle } from "react-native";
import { Colors } from "@/constants/colors";

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  padding?: number;
}

export function GlassCard({ children, style, padding = 16 }: GlassCardProps) {
  return (
    <View style={[styles.container, { padding }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.sand,
    shadowColor: Colors.ink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
});
