import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { AppBackground } from "@/components/ui/AppBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { PillButton } from "@/components/ui/PillButton";
import { Chip } from "@/components/ui/Chip";
import { IconButton } from "@/components/ui/IconButton";
import { ChevronLeftIcon, CheckIcon } from "@/components/ui/SvgIcons";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";
import * as subscriptionsApi from "@/lib/api/subscriptions";
import i18n from "@/lib/i18n";

export default function SubscriptionScreen() {
  const basicFeatures = i18n.t("subscription.features.basic") as unknown as string[];
  const proFeatures = i18n.t("subscription.features.pro") as unknown as string[];

  const handleSubscribe = async (tier: "BASIC" | "PRO") => {
    try {
      const { url } = await subscriptionsApi.checkout(tier);
      await WebBrowser.openBrowserAsync(url);
    } catch {
      // handle error
    }
  };

  return (
    <AppBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconButton onPress={() => router.back()}>
            <ChevronLeftIcon />
          </IconButton>
          <Text style={styles.headerTitle}>{i18n.t("subscription.title")}</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Current plan */}
        <GlassCard>
          <Text style={styles.sectionLabel}>{i18n.t("subscription.currentPlan")}</Text>
          <Chip label={i18n.t("subscription.noPlan")} variant="sand" />
        </GlassCard>

        {/* Basic Plan */}
        <GlassCard>
          <View style={styles.planHeader}>
            <Text style={styles.planName}>{i18n.t("subscription.basic")}</Text>
            <Text style={styles.planPrice}>1,500 L/mo</Text>
          </View>
          <View style={styles.features}>
            {basicFeatures.map((feature, idx) => (
              <View key={idx} style={styles.featureRow}>
                <CheckIcon size={16} color={Colors.sage} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
          <PillButton
            title={i18n.t("subscription.subscribe")}
            variant="outline"
            onPress={() => handleSubscribe("BASIC")}
          />
        </GlassCard>

        {/* Pro Plan */}
        <GlassCard style={styles.proPlan}>
          <View style={styles.planHeader}>
            <View style={styles.proLabel}>
              <Text style={styles.planName}>{i18n.t("subscription.pro")}</Text>
              <Chip label="Popular" active variant="sage" />
            </View>
            <Text style={styles.planPrice}>3,000 L/mo</Text>
          </View>
          <View style={styles.features}>
            {proFeatures.map((feature, idx) => (
              <View key={idx} style={styles.featureRow}>
                <CheckIcon size={16} color={Colors.sage} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
          <PillButton
            title={i18n.t("subscription.subscribe")}
            onPress={() => handleSubscribe("PRO")}
          />
        </GlassCard>

        <View style={{ height: 40 }} />
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 20, fontFamily: Fonts.display, color: Colors.ink },
  sectionLabel: {
    fontSize: 14,
    fontFamily: Fonts.bodySemibold,
    color: Colors.ink2,
    marginBottom: 8,
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  planName: { fontSize: 22, fontFamily: Fonts.bodySemibold, color: Colors.ink },
  planPrice: { fontSize: 18, fontFamily: Fonts.bodySemibold, color: Colors.sage },
  proLabel: { flexDirection: "row", alignItems: "center", gap: 10 },
  proPlan: {
    borderColor: Colors.sage,
    borderWidth: 2,
  },
  features: { gap: 10, marginBottom: 20 },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  featureText: { fontSize: 14, fontFamily: Fonts.body, color: Colors.ink2 },
});
