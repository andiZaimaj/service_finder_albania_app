import React from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { AppBackground } from "@/components/ui/AppBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { Avatar } from "@/components/ui/Avatar";
import { PillButton } from "@/components/ui/PillButton";
import { Chip } from "@/components/ui/Chip";
import { IconButton } from "@/components/ui/IconButton";
import { ChevronLeftIcon, CheckIcon, XIcon } from "@/components/ui/SvgIcons";
import { getFullName } from "@/lib/utils";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";
import { useJob, useJobProposals, useUpdateProposalStatus } from "@/hooks/useJobs";
import i18n from "@/lib/i18n";

export default function ProposalsScreen() {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const { data: job } = useJob(jobId);
  const { data: proposals, isLoading, refetch, isRefetching } = useJobProposals(jobId);
  const updateMutation = useUpdateProposalStatus();

  return (
    <AppBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton onPress={() => router.back()}>
            <ChevronLeftIcon />
          </IconButton>
          <Text style={styles.headerTitle}>{i18n.t("jobs.proposals")}</Text>
          <View style={{ width: 44 }} />
        </View>

        {job && (
          <View style={styles.jobInfo}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <View style={styles.jobMeta}>
              <Chip label={job.category} active variant="sage" />
              <Chip label={job.status} active variant={job.status === "OPEN" ? "sage" : "sand"} />
            </View>
          </View>
        )}

        <FlatList
          data={proposals || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <GlassCard>
                <View style={styles.proposalHeader}>
                  <Avatar name={item.worker ? getFullName(item.worker.user) : undefined || "W"} size={40} />
                  <View style={styles.proposalInfo}>
                    <Text style={styles.proposalName}>
                      {item.worker ? getFullName(item.worker.user) : undefined || "Worker"}
                    </Text>
                    <Text style={styles.proposalPrice}>
                      {item.priceEstimate.toLocaleString()} L
                    </Text>
                  </View>
                  <Chip
                    label={item.status}
                    active
                    variant={item.status === "ACCEPTED" ? "sage" : "sand"}
                  />
                </View>
                <Text style={styles.proposalMessage}>{item.message}</Text>
                {item.status === "PENDING" && (
                  <View style={styles.actions}>
                    <PillButton
                      title={i18n.t("jobs.reject")}
                      variant="ghost"
                      size="sm"
                      onPress={() => updateMutation.mutate({ proposalId: item.id, status: "REJECTED" })}
                      icon={<XIcon size={14} color={Colors.error} />}
                    />
                    <PillButton
                      title={i18n.t("jobs.accept")}
                      size="sm"
                      onPress={() => updateMutation.mutate({ proposalId: item.id, status: "ACCEPTED" })}
                      icon={<CheckIcon size={14} color={Colors.white} />}
                    />
                  </View>
                )}
              </GlassCard>
            </View>
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={Colors.sage} />
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>
                {isLoading ? i18n.t("common.loading") : "No proposals yet"}
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
  jobInfo: { paddingHorizontal: 20, marginBottom: 16, gap: 8 },
  jobTitle: { fontSize: 18, fontFamily: Fonts.bodySemibold, color: Colors.ink },
  jobMeta: { flexDirection: "row", gap: 8 },
  list: { paddingHorizontal: 20 },
  cardWrapper: { marginBottom: 12 },
  proposalHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 10 },
  proposalInfo: { flex: 1 },
  proposalName: { fontSize: 15, fontFamily: Fonts.bodySemibold, color: Colors.ink },
  proposalPrice: { fontSize: 14, fontFamily: Fonts.bodyMedium, color: Colors.sage },
  proposalMessage: { fontSize: 13, fontFamily: Fonts.body, color: Colors.ink2, lineHeight: 20, marginBottom: 12 },
  actions: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
  empty: { alignItems: "center", paddingTop: 60 },
  emptyText: { fontSize: 14, fontFamily: Fonts.body, color: Colors.inkMute },
});
