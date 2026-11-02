import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { router } from "expo-router";
import { AppBackground } from "@/components/ui/AppBackground";
import { PillButton } from "@/components/ui/PillButton";
import { Field } from "@/components/ui/Field";
import { IconButton } from "@/components/ui/IconButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { ChevronLeftIcon, MailIcon, LockIcon } from "@/components/ui/SvgIcons";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";
import { useLogin } from "@/hooks/useAuth";
import i18n from "@/lib/i18n";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();

  const handleLogin = () => {
    if (!email || !password) return;
    loginMutation.mutate({ email, password });
  };

  return (
    <AppBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <IconButton onPress={() => router.back()}>
              <ChevronLeftIcon />
            </IconButton>
          </View>

          <Text style={styles.title}>{i18n.t("login.title")}</Text>

          <View style={styles.form}>
            <Field
              placeholder={i18n.t("login.email")}
              icon={<MailIcon />}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <Field
              placeholder={i18n.t("login.password")}
              icon={<LockIcon />}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />

            <TouchableOpacity
              onPress={() => router.push("/(auth)/forgot-password")}
              style={styles.forgotLink}
            >
              <Text style={styles.forgotText}>
                {i18n.t("login.forgotPassword")}
              </Text>
            </TouchableOpacity>

            <PillButton
              title={i18n.t("login.signIn")}
              onPress={handleLogin}
              loading={loginMutation.isPending}
              disabled={!email || !password}
            />

            {loginMutation.isError && (
              <Text style={styles.errorText}>
                {loginMutation.error?.message || i18n.t("common.error")}
              </Text>
            )}
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{i18n.t("login.orContinueWith")}</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <GlassCard padding={14}>
                <Text style={styles.socialText}>Google</Text>
              </GlassCard>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <GlassCard padding={14}>
                <Text style={styles.socialText}>Apple</Text>
              </GlassCard>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {i18n.t("login.noAccount")}{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text style={styles.footerLink}>{i18n.t("login.register")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
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
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  forgotLink: {
    alignSelf: "flex-end",
  },
  forgotText: {
    fontSize: 13,
    fontFamily: Fonts.bodyMedium,
    color: Colors.sage,
  },
  errorText: {
    fontSize: 13,
    fontFamily: Fonts.body,
    color: Colors.error,
    textAlign: "center",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 28,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.sand,
  },
  dividerText: {
    fontSize: 13,
    fontFamily: Fonts.body,
    color: Colors.inkMute,
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    flex: 1,
  },
  socialText: {
    fontSize: 14,
    fontFamily: Fonts.bodySemibold,
    color: Colors.ink,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 28,
  },
  footerText: {
    fontSize: 14,
    fontFamily: Fonts.body,
    color: Colors.inkSoft,
  },
  footerLink: {
    fontSize: 14,
    fontFamily: Fonts.bodySemibold,
    color: Colors.sage,
  },
});
