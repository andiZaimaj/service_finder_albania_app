import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import { router } from "expo-router";
import { AppBackground } from "@/components/ui/AppBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { Chip } from "@/components/ui/Chip";
import { IconButton } from "@/components/ui/IconButton";
import { PillButton } from "@/components/ui/PillButton";
import { ChevronLeftIcon, PlusIcon, MapPinIcon } from "@/components/ui/SvgIcons";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";
import { useMyJobs } from "@/hooks/useJobs";
import i18n from "@/lib/i18n";

export default function MyJobsScreen() {
  const { data: jobs, isLoading, refetch, isRefetching } = useMyJobs();

  return (
    <AppBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton onPress={() => router.back()}>
            <ChevronLeftIcon />
          </IconButton>
          <Text style={styles.headerTitle}>{i18n.t("jobs.myJobs")}</Text>
          <View style={{ width: 44 }} />
        </View>

        <FlatList
          data={jobs || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cardWrapper}
              activeOpacity={0.85}
              onPress={() => router.push(`/proposal/${item.id}`)}
            >
              <GlassCard>
                <View style={styles.jobRow}>
                  <View style={styles.jobInfo}>
                    <Text style={styles.jobTitle}>{item.title}</Text>
                    <View style={styles.metaItem}>
                      <MapPinIcon size={14} />
                      <Text style={styles.metaText}>{item.city}</Text>
                    </View>
                  </View>
                  <View style={styles.jobRight}>
                    <Chip
                      label={item.status}
                      active
                      variant={item.status === "OPEN" ? "sage" : "sand"}
                    />
                    {item.proposalCount != null && (
                      <Text style={styles.proposalCount}>
                        {item.proposalCount} {i18n.t("jobs.proposals").toLowerCase()}
                      </Text>
                    )}
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

        <View style={styles.fab}>
          <PillButton
            title={i18n.t("jobs.postJob")}
            onPress={() => router.push("/job/create")}
            icon={<PlusIcon size={18} />}
            size="md"
          />
        </View>
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
  list: { paddingHorizontal: 20 },
  cardWrapper: { marginBottom: 12 },
  jobRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  jobInfo: { flex: 1, gap: 4 },
  jobTitle: { fontSize: 15, fontFamily: Fonts.bodySemibold, color: Colors.ink },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 12, fontFamily: Fonts.body, color: Colors.inkMute },
  jobRight: { alignItems: "flex-end", gap: 6 },
  proposalCount: { fontSize: 12, fontFamily: Fonts.body, color: Colors.inkSoft },
  empty: { alignItems: "center", paddingTop: 60 },
  emptyText: { fontSize: 14, fontFamily: Fonts.body, color: Colors.inkMute },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
  },
});
