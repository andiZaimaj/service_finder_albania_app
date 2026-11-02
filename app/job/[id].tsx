import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { AppBackground } from "@/components/ui/AppBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { PillButton } from "@/components/ui/PillButton";
import { Chip } from "@/components/ui/Chip";
import { Field } from "@/components/ui/Field";
import { IconButton } from "@/components/ui/IconButton";
import { ChevronLeftIcon, MapPinIcon, CalendarIcon } from "@/components/ui/SvgIcons";
import { getFullName } from "@/lib/utils";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";
import { useAuthStore } from "@/store/authStore";
import { useJob, useSubmitProposal } from "@/hooks/useJobs";
import i18n from "@/lib/i18n";

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = useAuthStore((s) => s.user);
  const { data: job, isLoading } = useJob(id);
  const submitMutation = useSubmitProposal();

  const [showProposalForm, setShowProposalForm] = useState(false);
  const [message, setMessage] = useState("");
  const [priceEstimate, setPriceEstimate] = useState("");

  const isWorker = user?.role === "WORKER";

  if (isLoading || !job) {
    return (
      <AppBackground>
        <View style={styles.center}>
          <Text style={styles.loadingText}>{i18n.t("common.loading")}</Text>
        </View>
      </AppBackground>
    );
  }

  const handleSubmitProposal = () => {
    if (!message || !priceEstimate) return;
    submitMutation.mutate(
      { jobId: id, message, priceEstimate: parseInt(priceEstimate, 10) },
      {
        onSuccess: () => {
          setShowProposalForm(false);
          setMessage("");
          setPriceEstimate("");
        },
      }
    );
  };

  return (
    <AppBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconButton onPress={() => router.back()}>
            <ChevronLeftIcon />
          </IconButton>
          <Text style={styles.headerTitle}>{i18n.t("worker.details")}</Text>
          <View style={{ width: 44 }} />
        </View>

        <GlassCard>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <View style={styles.metaRow}>
            <Chip label={job.category} active variant="sage" />
            <View style={styles.metaItem}>
              <MapPinIcon size={14} />
              <Text style={styles.metaText}>{job.city}</Text>
            </View>
            <View style={styles.metaItem}>
              <CalendarIcon size={14} />
              <Text style={styles.metaText}>
                {new Date(job.expiresAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
          <Chip
            label={job.status}
            active
            variant={job.status === "OPEN" ? "sage" : "sand"}
          />
        </GlassCard>

        <GlassCard>
          <Text style={styles.sectionTitle}>{i18n.t("jobs.description")}</Text>
          <Text style={styles.description}>{job.description}</Text>
        </GlassCard>

        {job.client && (
          <GlassCard>
            <Text style={styles.sectionTitle}>Posted by</Text>
            <Text style={styles.clientName}>{getFullName(job.client)}</Text>
            <Text style={styles.clientCity}>{job.client.city}</Text>
          </GlassCard>
        )}

        {isWorker && job.status === "OPEN" && !showProposalForm && (
          <PillButton
            title={i18n.t("jobs.submitProposal")}
            onPress={() => setShowProposalForm(true)}
          />
        )}

        {showProposalForm && (
          <GlassCard>
            <Text style={styles.sectionTitle}>{i18n.t("jobs.submitProposal")}</Text>
            <View style={styles.form}>
              <Field
                placeholder={i18n.t("jobs.message")}
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                style={{ minHeight: 80, textAlignVertical: "top" }}
              />
              <Field
                placeholder={i18n.t("jobs.priceEstimate")}
                value={priceEstimate}
                onChangeText={setPriceEstimate}
                keyboardType="numeric"
              />
              <View style={styles.formButtons}>
                <PillButton
                  title={i18n.t("common.cancel")}
                  variant="ghost"
                  size="md"
                  onPress={() => setShowProposalForm(false)}
                />
                <PillButton
                  title={i18n.t("jobs.submit")}
                  size="md"
                  onPress={handleSubmitProposal}
                  loading={submitMutation.isPending}
                  disabled={!message || !priceEstimate}
                />
              </View>
            </View>
          </GlassCard>
        )}

        {submitMutation.isSuccess && (
          <GlassCard>
            <Text style={styles.successText}>{i18n.t("jobs.alreadySubmitted")}</Text>
          </GlassCard>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
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
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingText: { fontSize: 14, fontFamily: Fonts.body, color: Colors.inkMute },
  jobTitle: {
    fontSize: 22,
    fontFamily: Fonts.bodySemibold,
    color: Colors.ink,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    fontFamily: Fonts.body,
    color: Colors.inkSoft,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.bodySemibold,
    color: Colors.ink,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.body,
    color: Colors.ink2,
    lineHeight: 22,
  },
  clientName: {
    fontSize: 15,
    fontFamily: Fonts.bodySemibold,
    color: Colors.ink,
  },
  clientCity: {
    fontSize: 13,
    fontFamily: Fonts.body,
    color: Colors.inkSoft,
    marginTop: 2,
  },
  form: { gap: 14 },
  formButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  successText: {
    fontSize: 14,
    fontFamily: Fonts.bodyMedium,
    color: Colors.success,
    textAlign: "center",
  },
});
