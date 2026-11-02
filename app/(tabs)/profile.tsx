import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { router } from "expo-router";
import { AppBackground } from "@/components/ui/AppBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { Avatar } from "@/components/ui/Avatar";
import { PillButton } from "@/components/ui/PillButton";
import { Chip } from "@/components/ui/Chip";
import { LogOutIcon, CameraIcon, BriefcaseIcon } from "@/components/ui/SvgIcons";
import { Colors } from "@/constants/colors";
import { getFullName } from "@/lib/utils";
import { Fonts } from "@/constants/typography";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import { useLogout } from "@/hooks/useAuth";
import i18n from "@/lib/i18n";

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const isGuest = useAuthStore((s) => s.isGuest);
  const { locale, setLocale } = useLanguageStore();
  const logoutMutation = useLogout();

  if (!user || isGuest) {
    return (
      <AppBackground>
        <View style={styles.guestContainer}>
          <Text style={styles.guestTitle}>{i18n.t("profile.title")}</Text>
          <Text style={styles.guestMessage}>Sign in to manage your profile</Text>
          <PillButton
            title={i18n.t("welcome.signIn")}
            onPress={() => router.push("/(auth)/login")}
            style={styles.guestButton}
          />

          <View style={styles.langSection}>
            <Text style={styles.sectionLabel}>{i18n.t("profile.language")}</Text>
            <View style={styles.langRow}>
              <Chip label="English" active={locale === "en"} onPress={() => setLocale("en")} />
              <Chip label="Shqip" active={locale === "sq"} onPress={() => setLocale("sq")} />
            </View>
          </View>
        </View>
      </AppBackground>
    );
  }

  const isWorker = user.role === "WORKER";

  return (
    <AppBackground>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{i18n.t("profile.title")}</Text>

        <GlassCard>
          <View style={styles.profileRow}>
            <Avatar name={getFullName(user)} size={64} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{getFullName(user)}</Text>
              <Chip
                label={user.role}
                active
                variant={isWorker ? "sage" : "sand"}
              />
            </View>
          </View>
        </GlassCard>

        <GlassCard>
          <Text style={styles.sectionLabel}>{i18n.t("profile.editProfile")}</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{user.phone}</Text>
            </View>
          </View>
        </GlassCard>

        {isWorker && (
          <>
            <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
              <GlassCard>
                <View style={styles.actionRow}>
                  <CameraIcon color={Colors.sage} />
                  <Text style={styles.actionText}>{i18n.t("profile.uploadId")}</Text>
                </View>
              </GlassCard>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/subscription/")} activeOpacity={0.8}>
              <GlassCard>
                <View style={styles.actionRow}>
                  <BriefcaseIcon color={Colors.sage} />
                  <Text style={styles.actionText}>{i18n.t("profile.mySubscription")}</Text>
                </View>
              </GlassCard>
            </TouchableOpacity>
          </>
        )}

        <GlassCard>
          <Text style={styles.sectionLabel}>{i18n.t("profile.language")}</Text>
          <View style={styles.langRow}>
            <Chip label="English" active={locale === "en"} onPress={() => setLocale("en")} />
            <Chip label="Shqip" active={locale === "sq"} onPress={() => setLocale("sq")} />
          </View>
        </GlassCard>

        <PillButton
          title={i18n.t("profile.logout")}
          variant="ghost"
          onPress={() => logoutMutation.mutate()}
          loading={logoutMutation.isPending}
          icon={<LogOutIcon size={18} />}
        />

        <View style={{ height: 100 }} />
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.display,
    color: Colors.ink,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  profileInfo: {
    gap: 8,
  },
  profileName: {
    fontSize: 20,
    fontFamily: Fonts.bodySemibold,
    color: Colors.ink,
  },
  sectionLabel: {
    fontSize: 14,
    fontFamily: Fonts.bodySemibold,
    color: Colors.ink2,
    marginBottom: 12,
  },
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    gap: 2,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: Fonts.body,
    color: Colors.inkMute,
  },
  infoValue: {
    fontSize: 15,
    fontFamily: Fonts.bodyMedium,
    color: Colors.ink,
  },
  langRow: {
    flexDirection: "row",
    gap: 10,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionText: {
    fontSize: 15,
    fontFamily: Fonts.bodyMedium,
    color: Colors.ink,
  },
  guestContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    gap: 16,
  },
  guestTitle: {
    fontSize: 28,
    fontFamily: Fonts.display,
    color: Colors.ink,
  },
  guestMessage: {
    fontSize: 15,
    fontFamily: Fonts.body,
    color: Colors.inkSoft,
  },
  guestButton: {
    width: 200,
  },
  langSection: {
    marginTop: 20,
    gap: 12,
  },
});
