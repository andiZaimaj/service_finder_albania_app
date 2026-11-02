import React from "react";
import { View, TextInput, Text, StyleSheet, type TextInputProps } from "react-native";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";

interface FieldProps extends TextInputProps {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export function Field({ label, icon, error, style, ...props }: FieldProps) {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.container, error ? styles.errorBorder : null]}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={Colors.inkMute}
          {...props}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    color: Colors.ink2,
    fontFamily: Fonts.bodyMedium,
    marginLeft: 4,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.sand,
    paddingHorizontal: 14,
    minHeight: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.ink,
    fontFamily: Fonts.body,
    paddingVertical: 12,
  },
  errorBorder: {
    borderColor: Colors.error,
  },
  error: {
    fontSize: 12,
    color: Colors.error,
    fontFamily: Fonts.body,
    marginLeft: 4,
  },
});
