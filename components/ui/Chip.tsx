import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";

interface ChipProps {
  label: string;
  active?: boolean;
  variant?: "sage" | "sand";
  onPress?: () => void;
  icon?: React.ReactNode;
}

export function Chip({ label, active = false, variant = "sage", onPress, icon }: ChipProps) {
  const bg =
    variant === "sage"
      ? active
        ? Colors.sage
        : "rgba(74,127,118,0.1)"
      : active
        ? Colors.sand
        : "rgba(224,207,174,0.3)";

  const textColor =
    variant === "sage"
      ? active
        ? Colors.white
        : Colors.sage
      : active
        ? Colors.ink
        : Colors.inkSoft;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, { backgroundColor: bg }]}
      activeOpacity={0.7}
    >
      {icon}
      <Text style={[styles.label, { color: textColor, fontFamily: Fonts.bodyMedium }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  label: {
    fontSize: 13,
  },
});
