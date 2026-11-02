import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";

type ButtonVariant = "primary" | "ghost" | "sand" | "outline";

interface PillButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  size?: "sm" | "md" | "lg";
}

export function PillButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  icon,
  style,
  size = "lg",
}: PillButtonProps) {
  const height = size === "sm" ? 36 : size === "md" ? 44 : 52;
  const fontSize = size === "sm" ? 13 : size === "md" ? 14 : 16;

  if (variant === "primary") {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[{ borderRadius: height / 2, overflow: "hidden", opacity: disabled ? 0.5 : 1 }, style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[Colors.sage, Colors.sageDeep]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.button, { height, paddingHorizontal: size === "sm" ? 16 : 24 }]}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white} size="small" />
          ) : (
            <>
              {icon}
              <Text style={[styles.primaryText, { fontSize, fontFamily: Fonts.bodySemibold }]}>
                {title}
              </Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const variantStyles = {
    ghost: { bg: "transparent", border: "transparent", text: Colors.sage },
    sand: { bg: Colors.sand, border: Colors.sand, text: Colors.ink },
    outline: { bg: "transparent", border: Colors.sage, text: Colors.sage },
  };

  const v = variantStyles[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          height,
          paddingHorizontal: size === "sm" ? 16 : 24,
          backgroundColor: v.bg,
          borderWidth: variant === "outline" ? 1.5 : 0,
          borderColor: v.border,
          borderRadius: height / 2,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={v.text} size="small" />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, { color: v.text, fontSize, fontFamily: Fonts.bodySemibold }]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryText: {
    color: Colors.white,
  },
  text: {},
});
