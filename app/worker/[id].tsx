import React from "react";
import { View, Text, StyleSheet, ScrollView, Linking } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { AppBackground } from "@/components/ui/AppBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { Avatar } from "@/components/ui/Avatar";
import { Stars } from "@/components/ui/Stars";
import { PillButton } from "@/components/ui/PillButton";
import { Chip } from "@/components/ui/Chip";
import { IconButton } from "@/components/ui/IconButton";
import { ChevronLeftIcon, BookmarkIcon, LockIcon, PhoneIcon } from "@/components/ui/SvgIcons";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";
import { CATEGORIES } from "@/constants/categories";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import { useSavedStore } from "@/store/savedStore";
import { useWorker, useWorkerReviews } from "@/hooks/useWorkers";
import type { Review } from "@/types/api";
import i18n from "@/lib/i18n";
import { getFullName } from "@/lib/utils";

export default function WorkerProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = useAuthStore((s) => s.user);
  const isGuest = useAuthStore((s) => s.isGuest);
  const locale = useLanguageStore((s) => s.locale);
  const { toggleSaved, isSaved } = useSavedStore();

  const { data: worker, isLoading } = useWorker(id);
  const { data: reviews } = useWorkerReviews(id);

  const isLoggedIn = !!user && !isGuest;
  const saved = isSaved(id);

  if (isLoading || !worker) {
    return (
      <AppBackground>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>{i18n.t("common.loading")}</Text>
        </View>
      </AppBackground>
    );
  }

  const getCategoryLabel = (key: string) => {
    const cat = CATEGORIES.find((c) => c.key === key);
    return cat ? (locale === "sq" ? cat.labelSq : cat.labelEn) : key;
  };

  return (
    <AppBackground>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <IconButton onPress={() => router.back()}>
            <ChevronLeftIcon />
          </IconButton>
          <Text style={styles.headerTitle}>{i18n.t("worker.details")}</Text>
          <IconButton onPress={() => toggleSaved(id)}>
            <BookmarkIcon color={saved ? Colors.sage : Colors.inkSoft} filled={saved} />
          </IconButton>
        </View>

        {/* Hero Card */}
        <GlassCard>
          <View style={styles.heroRow}>
            <Avatar name={getFullName(worker.user)} size={72} />
            <View style={styles.heroInfo}>
              <Text style={styles.heroName}>{getFullName(worker.user)}</Text>
              <Text style={styles.heroCategory}>
                {worker.categories.map(getCategoryLabel).join(", ")}
              </Text>
              <Text style={styles.heroCity}>{worker.cities.join(", ")}</Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{worker.rating.toFixed(1)}</Text>
              <Text style={styles.statLabel}>{i18n.t("worker.rating")}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{worker.jobsCompleted}</Text>
              <Text style={styles.statLabel}>{i18n.t("worker.jobs")}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {worker.startsAt ? `${worker.startsAt.toLocaleString()} L` : "-"}
              </Text>
              <Text style={styles.statLabel}>{i18n.t("worker.startsAt")}</Text>
            </View>
          </View>

          <View style={styles.badges}>
            {worker.verified && <Chip label={i18n.t("worker.verified")} active variant="sage" />}
            {worker.rating >= 4.7 && <Chip label={i18n.t("worker.topRated")} active variant="sand" />}
          </View>
        </GlassCard>

        {/* About */}
        <GlassCard>
          <Text style={styles.sectionTitle}>{i18n.t("worker.about")}</Text>
          <Text style={styles.bioText}>{worker.bio}</Text>
        </GlassCard>

        {/* Trades & Cities */}
        <GlassCard>
          <Text style={styles.sectionTitle}>{i18n.t("worker.trades")}</Text>
          <View style={styles.chipGroup}>
            {worker.categories.map((cat: string) => (
              <Chip key={cat} label={getCategoryLabel(cat)} active variant="sage" />
            ))}
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
            {i18n.t("worker.servesCities")}
          </Text>
          <View style={styles.chipGroup}>
            {worker.cities.map((city: string) => (
              <Chip key={city} label={city} variant="sand" />
            ))}
          </View>
        </GlassCard>

        {/* Reviews */}
        <View style={styles.reviewsHeader}>
          <Text style={styles.sectionTitle}>{i18n.t("worker.reviews")}</Text>
          <Stars rating={worker.rating} size={18} />
        </View>

        {reviews?.map((review: Review) => (
          <GlassCard key={review.id}>
            <View style={styles.reviewRow}>
              <Avatar name={review.client ? getFullName(review.client) : undefined || "User"} size={36} />
              <View style={styles.reviewInfo}>
                <Text style={styles.reviewName}>{review.client ? getFullName(review.client) : undefined || "User"}</Text>
                <Stars rating={review.rating} size={12} />
              </View>
              <Text style={styles.reviewDate}>
                {new Date(review.createdAt).toLocaleDateString()}
              </Text>
            </View>
            {review.comment && (
              <Text style={styles.reviewComment}>{review.comment}</Text>
            )}
          </GlassCard>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky bottom CTA */}
      <View style={styles.ctaContainer}>
        <GlassCard padding={12}>
          {isLoggedIn ? (
            <View style={styles.ctaRow}>
              <PillButton
                title={i18n.t("worker.call")}
                variant="ghost"
                size="md"
                onPress={() => Linking.openURL(`tel:${worker.user.phone}`)}
                icon={<PhoneIcon color={Colors.sage} size={18} />}
                style={styles.ctaPhone}
              />
              <PillButton
                title={`${i18n.t("worker.contact")} ${getFullName(worker.user).split(" ")[0]}`}
                size="md"
                onPress={() => router.push(`/messages/${worker.userId}`)}
                style={styles.ctaContact}
              />
            </View>
          ) : (
            <PillButton
              title={i18n.t("worker.signInToContact")}
              onPress={() => router.push("/(auth)/login")}
              icon={<LockIcon color={Colors.white} size={18} />}
            />
          )}
        </GlassCard>
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.display,
    color: Colors.ink,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 14,
    fontFamily: Fonts.body,
    color: Colors.inkMute,
  },
  heroRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  heroInfo: {
    flex: 1,
    gap: 4,
  },
  heroName: {
    fontSize: 22,
    fontFamily: Fonts.bodySemibold,
    color: Colors.ink,
  },
  heroCategory: {
    fontSize: 14,
    fontFamily: Fonts.bodyMedium,
    color: Colors.sage,
  },
  heroCity: {
    fontSize: 13,
    fontFamily: Fonts.body,
    color: Colors.inkSoft,
  },
  statsGrid: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.creamSoft,
    borderRadius: 14,
    paddingVertical: 12,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  statValue: {
    fontSize: 16,
    fontFamily: Fonts.bodySemibold,
    color: Colors.ink,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: Fonts.body,
    color: Colors.inkMute,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: Colors.sand,
  },
  badges: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.bodySemibold,
    color: Colors.ink,
    marginBottom: 8,
  },
  bioText: {
    fontSize: 14,
    fontFamily: Fonts.body,
    color: Colors.ink2,
    lineHeight: 22,
  },
  chipGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  reviewInfo: {
    flex: 1,
    gap: 2,
  },
  reviewName: {
    fontSize: 14,
    fontFamily: Fonts.bodySemibold,
    color: Colors.ink,
  },
  reviewDate: {
    fontSize: 11,
    fontFamily: Fonts.body,
    color: Colors.inkMute,
  },
  reviewComment: {
    fontSize: 13,
    fontFamily: Fonts.body,
    color: Colors.ink2,
    lineHeight: 20,
  },
  ctaContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  ctaRow: {
    flexDirection: "row",
    gap: 10,
  },
  ctaPhone: {
    flex: 0,
    paddingHorizontal: 16,
  },
  ctaContact: {
    flex: 1,
  },
});
