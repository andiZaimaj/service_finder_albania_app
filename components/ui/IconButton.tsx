import React from "react";
import { TouchableOpacity, StyleSheet, type ViewStyle } from "react-native";
import { Colors } from "@/constants/colors";

interface IconButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
  size?: number;
}

export function IconButton({ onPress, children, style, size = 44 }: IconButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.sand,
    shadowColor: Colors.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
});
