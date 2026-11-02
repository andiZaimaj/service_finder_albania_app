import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ScrollView } from "react-native";
import { router } from "expo-router";
import { AppBackground } from "@/components/ui/AppBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { Chip } from "@/components/ui/Chip";
import { IconButton } from "@/components/ui/IconButton";
import { ChevronLeftIcon, MapPinIcon, CalendarIcon } from "@/components/ui/SvgIcons";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";
import { CATEGORIES } from "@/constants/categories";
import { CITIES } from "@/constants/cities";
import { useLanguageStore } from "@/store/languageStore";
import { useBrowseJobs } from "@/hooks/useJobs";
import i18n from "@/lib/i18n";

export default function BrowseJobsScreen() {
  const locale = useLanguageStore((s) => s.locale);
  const [category, setCategory] = useState<string | undefined>();
  const [city, setCity] = useState<string | undefined>();
  const { data: jobs, isLoading, refetch, isRefetching } = useBrowseJobs({ category, city });

  return (
    <AppBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton onPress={() => router.back()}>
            <ChevronLeftIcon />
          </IconButton>
          <Text style={styles.headerTitle}>{i18n.t("jobs.browseJobs")}</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <View style={styles.chipRow}>
            <Chip label={i18n.t("common.all")} active={!category} onPress={() => setCategory(undefined)} />
            {CATEGORIES.map((cat) => (
              <Chip
                key={cat.key}
                label={locale === "sq" ? cat.labelSq : cat.labelEn}
                active={category === cat.key}
                onPress={() => setCategory(category === cat.key ? undefined : cat.key)}
              />
            ))}
          </View>
        </ScrollView>

        <FlatList
          data={jobs || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cardWrapper}
              activeOpacity={0.85}
              onPress={() => router.push(`/job/${item.id}`)}
            >
              <GlassCard>
                <Text style={styles.jobTitle}>{item.title}</Text>
                <Text style={styles.jobDesc} numberOfLines={2}>{item.description}</Text>
                <View style={styles.jobMeta}>
                  <Chip label={item.category} active variant="sage" />
                  <View style={styles.metaItem}>
                    <MapPinIcon size={14} />
                    <Text style={styles.metaText}>{item.city}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <CalendarIcon size={14} />
                    <Text style={styles.metaText}>
                      {new Date(item.expiresAt).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </GlassCard>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={Colors.sage} />
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>
                {isLoading ? i18n.t("common.loading") : i18n.t("jobs.noJobs")}
              </Text>
            </View>
          }
        />
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 12 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  headerTitle: { fontSize: 20, fontFamily: Fonts.display, color: Colors.ink },
  filterScroll: { marginBottom: 12, paddingHorizontal: 20 },
  chipRow: { flexDirection: "row", gap: 8 },
  list: { paddingHorizontal: 20 },
  cardWrapper: { marginBottom: 12 },
  jobTitle: { fontSize: 16, fontFamily: Fonts.bodySemibold, color: Colors.ink, marginBottom: 4 },
  jobDesc: { fontSize: 13, fontFamily: Fonts.body, color: Colors.inkSoft, marginBottom: 10, lineHeight: 20 },
  jobMeta: { flexDirection: "row", alignItems: "center", gap: 12, flexWrap: "wrap" },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 12, fontFamily: Fonts.body, color: Colors.inkMute },
  empty: { alignItems: "center", paddingTop: 60 },
  emptyText: { fontSize: 14, fontFamily: Fonts.body, color: Colors.inkMute },
});
