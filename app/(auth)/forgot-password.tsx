import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import { AppBackground } from "@/components/ui/AppBackground";
import { PillButton } from "@/components/ui/PillButton";
import { Field } from "@/components/ui/Field";
import { IconButton } from "@/components/ui/IconButton";
import { ChevronLeftIcon, MailIcon } from "@/components/ui/SvgIcons";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";
import { useForgotPassword } from "@/hooks/useAuth";
import i18n from "@/lib/i18n";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const mutation = useForgotPassword();

  return (
    <AppBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <IconButton onPress={() => router.back()}>
              <ChevronLeftIcon />
            </IconButton>
          </View>

          <Text style={styles.title}>{i18n.t("forgotPassword.title")}</Text>
          <Text style={styles.description}>{i18n.t("forgotPassword.description")}</Text>

          <View style={styles.form}>
            <Field
              placeholder={i18n.t("forgotPassword.email")}
              icon={<MailIcon />}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <PillButton
              title={i18n.t("forgotPassword.send")}
              onPress={() => mutation.mutate(email)}
              loading={mutation.isPending}
              disabled={!email}
            />

            {mutation.isSuccess && (
              <Text style={styles.successText}>
                Check your email for the reset link.
              </Text>
            )}
          </View>

          <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
            <Text style={styles.backText}>{i18n.t("forgotPassword.backToLogin")}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 24,
  },
  title: {
    fontSize: 34,
    fontFamily: Fonts.display,
    color: Colors.ink,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    fontFamily: Fonts.body,
    color: Colors.inkSoft,
    marginBottom: 32,
    lineHeight: 22,
  },
  form: {
    gap: 16,
  },
  successText: {
    fontSize: 14,
    fontFamily: Fonts.bodyMedium,
    color: Colors.success,
    textAlign: "center",
  },
  backLink: {
    alignSelf: "center",
    marginTop: 24,
  },
  backText: {
    fontSize: 14,
    fontFamily: Fonts.bodyMedium,
    color: Colors.sage,
  },
});
