import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { AppBackground } from "@/components/ui/AppBackground";
import { PillButton } from "@/components/ui/PillButton";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";
import { useAuthStore } from "@/store/authStore";
import i18n from "@/lib/i18n";
import Svg, { Circle, Path } from "react-native-svg";

function Logo() {
  return (
    <View style={styles.logoContainer}>
      <View style={styles.logoCircle}>
        <Svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke={Colors.white} strokeWidth={2}>
          <Path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </Svg>
      </View>
      <Text style={styles.logoText}>Service Finder</Text>
    </View>
  );
}

function BlobDecoration() {
  return (
    <View style={styles.blobContainer}>
      <Svg width={220} height={220} viewBox="0 0 200 200">
        <Circle cx="100" cy="100" r="80" fill={Colors.sageMint} opacity={0.4} />
        <Circle cx="70" cy="80" r="50" fill={Colors.sageSoft} opacity={0.3} />
        <Circle cx="130" cy="120" r="40" fill={Colors.sand} opacity={0.3} />
      </Svg>
    </View>
  );
}

export default function WelcomeScreen() {
  const setGuest = useAuthStore((s) => s.setGuest);

  const handleBrowseGuest = () => {
    setGuest(true);
    router.replace("/(tabs)");
  };

  return (
    <AppBackground>
      <View style={styles.container}>
        <Logo />

        <BlobDecoration />

        <Text style={styles.headline}>{i18n.t("welcome.headline")}</Text>

        <View style={styles.buttons}>
          <PillButton
            title={i18n.t("welcome.signIn")}
            variant="ghost"
            onPress={() => router.push("/(auth)/login")}
          />
          <PillButton
            title={i18n.t("welcome.getStarted")}
            onPress={() => router.push("/(auth)/register")}
          />
          <Text style={styles.guestLink} onPress={handleBrowseGuest}>
            {i18n.t("welcome.browseGuest")}
          </Text>
        </View>
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.sage,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 20,
    fontFamily: Fonts.bodySemibold,
    color: Colors.ink,
  },
  blobContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  headline: {
    fontSize: 36,
    fontFamily: Fonts.display,
    color: Colors.ink,
    lineHeight: 46,
    marginBottom: 20,
  },
  buttons: {
    gap: 12,
  },
  guestLink: {
    fontSize: 14,
    fontFamily: Fonts.bodyMedium,
    color: Colors.inkSoft,
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 4,
  },
});
