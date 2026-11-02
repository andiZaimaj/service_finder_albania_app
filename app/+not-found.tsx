import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { AppBackground } from "@/components/ui/AppBackground";
import { PillButton } from "@/components/ui/PillButton";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";

export default function NotFoundScreen() {
  return (
    <AppBackground>
      <View style={styles.container}>
        <Text style={styles.code}>404</Text>
        <Text style={styles.message}>Page not found</Text>
        <PillButton
          title="Go Home"
          onPress={() => router.replace("/(tabs)")}
          style={styles.button}
        />
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  code: {
    fontSize: 64,
    fontFamily: Fonts.display,
    color: Colors.sage,
  },
  message: {
    fontSize: 18,
    fontFamily: Fonts.bodyMedium,
    color: Colors.inkSoft,
    marginTop: 8,
    marginBottom: 32,
  },
  button: {
    width: 200,
  },
});
