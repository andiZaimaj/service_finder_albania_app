import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ScrollView } from "react-native";
import { router } from "expo-router";
import { AppBackground } from "@/components/ui/AppBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { PillButton } from "@/components/ui/PillButton";
import { Chip } from "@/components/ui/Chip";
import { IconButton } from "@/components/ui/IconButton";
import { Avatar } from "@/components/ui/Avatar";
import { WorkerCard } from "@/components/ui/WorkerCard";
import { Field } from "@/components/ui/Field";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { SearchIcon, BellIcon, FilterIcon, LockIcon, BriefcaseIcon } from "@/components/ui/SvgIcons";
import { getFullName } from "@/lib/utils";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";
import { CATEGORIES } from "@/constants/categories";
import { CITIES } from "@/constants/cities";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import { useWorkers } from "@/hooks/useWorkers";
import i18n from "@/lib/i18n";
import type { CategoryKey } from "@/constants/categories";

function WorkerDashboard() {
  return (
    <View style={styles.dashboardContainer}>
      <Text style={styles.dashboardTitle}>Worker Dashboard</Text>
      <View style={styles.dashboardCards}>
        <TouchableOpacity onPress={() => router.push("/subscription/")} activeOpacity={0.8}>
          <GlassCard>
            <Text style={styles.dashCardTitle}>{i18n.t("profile.mySubscription")}</Text>
            <Text style={styles.dashCardSub}>{i18n.t("subscription.noPlan")}</Text>
          </GlassCard>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/job/browse")} activeOpacity={0.8}>
          <GlassCard>
            <View style={styles.dashCardRow}>
              <BriefcaseIcon color={Colors.sage} />
              <Text style={styles.dashCardTitle}>{i18n.t("profile.browseJobs")}</Text>
            </View>
          </GlassCard>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/profile")} activeOpacity={0.8}>
          <GlassCard>
            <Text style={styles.dashCardTitle}>{i18n.t("profile.editProfile")}</Text>
          </GlassCard>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const isGuest = useAuthStore((s) => s.isGuest);
  const locale = useLanguageStore((s) => s.locale);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedCity, setSelectedCity] = useState<string | undefined>();

  const { data: workers, isLoading, refetch, isRefetching } = useWorkers({
    category: selectedCategory,
    city: selectedCity,
    search: search || undefined,
  });

  const isLoggedIn = !!user && !isGuest;
  const isWorker = user?.role === "WORKER";

  const getCategoryLabel = (cat: typeof CATEGORIES[number]) =>
    locale === "sq" ? cat.labelSq : cat.labelEn;

  return (
    <AppBackground>
      <FlatList
        data={workers || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <WorkerCard worker={item} />
          </View>
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={Colors.sage} />
        }
        ListHeaderComponent={
          <View style={styles.headerSection}>
            {/* Top bar */}
            <View style={styles.topBar}>
              {isLoggedIn ? (
                <View style={styles.greetingRow}>
                  <Avatar name={getFullName(user)} size={40} />
                  <View>
                    <Text style={styles.greeting}>
                      {i18n.t("home.greeting")} {getFullName(user).split(" ")[0]}
                    </Text>
                    <Text style={styles.subtitle}>{i18n.t("home.subtitle")}</Text>
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={styles.guestLabel}>{i18n.t("home.browsingGuest")}</Text>
                  <Text style={styles.brandTitle}>Service Finder</Text>
                </View>
              )}
              {isLoggedIn ? (
                <IconButton onPress={() => router.push("/notifications/")}>
                  <BellIcon color={Colors.ink} />
                </IconButton>
              ) : (
                <PillButton
                  title={i18n.t("home.signIn")}
                  variant="outline"
                  size="sm"
                  onPress={() => router.push("/(auth)/login")}
                />
              )}
            </View>

            {/* Worker Dashboard */}
            {isWorker && <WorkerDashboard />}

            {/* Search */}
            <View style={styles.searchRow}>
              <View style={styles.searchField}>
                <Field
                  placeholder={i18n.t("home.search")}
                  icon={<SearchIcon />}
                  value={search}
                  onChangeText={setSearch}
                  returnKeyType="search"
                />
              </View>
              <IconButton onPress={() => {}} size={50}>
                <FilterIcon color={Colors.sage} />
              </IconButton>
            </View>

            {/* City chips */}
            {isLoggedIn && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                <View style={styles.chipRow}>
                  <Chip
                    label={i18n.t("common.all")}
                    active={!selectedCity}
                    onPress={() => setSelectedCity(undefined)}
                  />
                  {CITIES.slice(0, 6).map((city) => (
                    <Chip
                      key={city}
                      label={city}
                      active={selectedCity === city}
                      onPress={() => setSelectedCity(selectedCity === city ? undefined : city)}
                    />
                  ))}
                </View>
              </ScrollView>
            )}

            {/* Category chips */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
              <View style={styles.chipRow}>
                <Chip
                  label={i18n.t("common.all")}
                  active={!selectedCategory}
                  variant="sand"
                  onPress={() => setSelectedCategory(undefined)}
                />
                {CATEGORIES.map((cat) => (
                  <Chip
                    key={cat.key}
                    label={getCategoryLabel(cat)}
                    active={selectedCategory === cat.key}
                    variant="sand"
                    onPress={() => setSelectedCategory(selectedCategory === cat.key ? undefined : cat.key)}
                    icon={<CategoryIcon category={cat.key as CategoryKey} size={16} color={selectedCategory === cat.key ? Colors.ink : Colors.inkSoft} />}
                  />
                ))}
              </View>
            </ScrollView>

            {/* Sign-in nudge (guest only) */}
            {!isLoggedIn && (
              <GlassCard style={styles.nudge}>
                <View style={styles.nudgeRow}>
                  <LockIcon color={Colors.sage} size={20} />
                  <Text style={styles.nudgeText}>{i18n.t("home.signInNudge")}</Text>
                </View>
              </GlassCard>
            )}

            {/* Results header */}
            <Text style={styles.sectionTitle}>
              {i18n.t("home.topRated")}
              {workers && ` · ${workers.length} ${i18n.t("home.results")}`}
            </Text>
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{i18n.t("common.loading")}</Text>
            </View>
          ) : null
        }
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 12,
  },
  headerSection: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 8,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    fontFamily: Fonts.body,
    color: Colors.inkSoft,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: Fonts.display,
    color: Colors.ink,
  },
  guestLabel: {
    fontSize: 12,
    fontFamily: Fonts.bodyMedium,
    color: Colors.inkMute,
  },
  brandTitle: {
    fontSize: 22,
    fontFamily: Fonts.display,
    color: Colors.ink,
  },
  searchRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  searchField: {
    flex: 1,
  },
  chipScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  chipRow: {
    flexDirection: "row",
    gap: 8,
  },
  nudge: {
    marginTop: 4,
  },
  nudgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  nudgeText: {
    flex: 1,
    fontSize: 13,
    fontFamily: Fonts.bodyMedium,
    color: Colors.ink2,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.bodySemibold,
    color: Colors.ink,
    marginTop: 4,
  },
  cardWrapper: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    fontFamily: Fonts.body,
    color: Colors.inkMute,
  },
  dashboardContainer: {
    gap: 12,
    marginTop: 8,
  },
  dashboardTitle: {
    fontSize: 18,
    fontFamily: Fonts.bodySemibold,
    color: Colors.ink,
  },
  dashboardCards: {
    gap: 10,
  },
  dashCardTitle: {
    fontSize: 15,
    fontFamily: Fonts.bodySemibold,
    color: Colors.ink,
  },
  dashCardSub: {
    fontSize: 13,
    fontFamily: Fonts.body,
    color: Colors.inkMute,
    marginTop: 4,
  },
  dashCardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
