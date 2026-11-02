import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AppBackground } from "@/components/ui/AppBackground";
import { PillButton } from "@/components/ui/PillButton";
import { Field } from "@/components/ui/Field";
import { LockIcon } from "@/components/ui/SvgIcons";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";
import { useResetPassword } from "@/hooks/useAuth";
import i18n from "@/lib/i18n";

export default function ResetPasswordScreen() {
  const { token } = useLocalSearchParams<{ token: string }>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const mutation = useResetPassword();

  const passwordsMatch = password === confirmPassword;

  return (
    <AppBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{i18n.t("resetPassword.title")}</Text>

          <View style={styles.form}>
            <Field
              placeholder={i18n.t("resetPassword.newPassword")}
              icon={<LockIcon />}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Field
              placeholder={i18n.t("resetPassword.confirmPassword")}
              icon={<LockIcon />}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              error={confirmPassword && !passwordsMatch ? "Passwords don't match" : undefined}
            />
            <PillButton
              title={i18n.t("resetPassword.submit")}
              onPress={() => mutation.mutate({ token: token || "", newPassword: password })}
              loading={mutation.isPending}
              disabled={!password || !passwordsMatch}
            />
          </View>
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
    paddingTop: 80,
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
});
