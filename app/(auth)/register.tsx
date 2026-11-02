import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { router } from "expo-router";
import { AppBackground } from "@/components/ui/AppBackground";
import { PillButton } from "@/components/ui/PillButton";
import { Field } from "@/components/ui/Field";
import { IconButton } from "@/components/ui/IconButton";
import { ChevronLeftIcon, UserIcon, MailIcon, PhoneIcon, LockIcon } from "@/components/ui/SvgIcons";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";
import { useRegister } from "@/hooks/useAuth";
import i18n from "@/lib/i18n";

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"CLIENT" | "WORKER">("CLIENT");
  const registerMutation = useRegister();

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password) return;
    registerMutation.mutate({ firstName, lastName, email, phone: phone || undefined, password, role });
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

          <Text style={styles.title}>{i18n.t("register.title")}</Text>

          <View style={styles.form}>
            <Field
              placeholder={i18n.t("register.firstName")}
              icon={<UserIcon />}
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
            <Field
              placeholder={i18n.t("register.lastName")}
              icon={<UserIcon />}
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
            />
            <Field
              placeholder={i18n.t("register.email")}
              icon={<MailIcon />}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Field
              placeholder={i18n.t("register.phone")}
              icon={<PhoneIcon />}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <Field
              placeholder={i18n.t("register.password")}
              icon={<LockIcon />}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>{i18n.t("register.iAmA")}</Text>
              <View style={styles.roleRow}>
                <TouchableOpacity
                  style={[styles.roleButton, role === "CLIENT" && styles.roleActive]}
                  onPress={() => setRole("CLIENT")}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.roleText, role === "CLIENT" && styles.roleTextActive]}>
                    {i18n.t("register.client")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.roleButton, role === "WORKER" && styles.roleActive]}
                  onPress={() => setRole("WORKER")}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.roleText, role === "WORKER" && styles.roleTextActive]}>
                    {i18n.t("register.worker")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.terms}>{i18n.t("register.terms")}</Text>

            <PillButton
              title={i18n.t("register.createAccount")}
              onPress={handleRegister}
              loading={registerMutation.isPending}
              disabled={!firstName || !lastName || !email || !password}
            />

            {registerMutation.isError && (
              <Text style={styles.errorText}>
                {registerMutation.error?.message || i18n.t("common.error")}
              </Text>
            )}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {i18n.t("register.haveAccount")}{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text style={styles.footerLink}>{i18n.t("register.signIn")}</Text>
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
    marginBottom: 28,
  },
  form: {
    gap: 16,
  },
  section: {
    gap: 8,
  },
  sectionLabel: {
    fontSize: 13,
    fontFamily: Fonts.bodyMedium,
    color: Colors.ink2,
    marginLeft: 4,
  },
  roleRow: {
    flexDirection: "row",
    gap: 12,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.sand,
    alignItems: "center",
  },
  roleActive: {
    backgroundColor: "rgba(74,127,118,0.1)",
    borderColor: Colors.sage,
  },
  roleText: {
    fontSize: 15,
    fontFamily: Fonts.bodySemibold,
    color: Colors.inkSoft,
  },
  roleTextActive: {
    color: Colors.sage,
  },
  terms: {
    fontSize: 12,
    fontFamily: Fonts.body,
    color: Colors.inkMute,
    textAlign: "center",
    lineHeight: 18,
  },
  errorText: {
    fontSize: 13,
    fontFamily: Fonts.body,
    color: Colors.error,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
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
