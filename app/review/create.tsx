import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { AppBackground } from "@/components/ui/AppBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { PillButton } from "@/components/ui/PillButton";
import { Field } from "@/components/ui/Field";
import { Stars } from "@/components/ui/Stars";
import { IconButton } from "@/components/ui/IconButton";
import { ChevronLeftIcon } from "@/components/ui/SvgIcons";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";
import * as reviewsApi from "@/lib/api/reviews";
import i18n from "@/lib/i18n";

export default function CreateReviewScreen() {
  const { workerId } = useLocalSearchParams<{ workerId: string }>();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const mutation = useMutation({
    mutationFn: () =>
      reviewsApi.createReview({
        workerId,
        rating,
        comment: comment || undefined,
      }),
    onSuccess: () => router.back(),
  });

  return (
    <AppBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <IconButton onPress={() => router.back()}>
              <ChevronLeftIcon />
            </IconButton>
            <Text style={styles.headerTitle}>{i18n.t("review.title")}</Text>
            <View style={{ width: 44 }} />
          </View>

          <GlassCard>
            <View style={styles.form}>
              <View style={styles.ratingSection}>
                <Text style={styles.label}>{i18n.t("review.rating")}</Text>
                <Stars rating={rating} size={36} interactive onRate={setRating} />
              </View>

              <Field
                label={i18n.t("review.comment")}
                placeholder={i18n.t("review.comment")}
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={4}
                style={{ minHeight: 100, textAlignVertical: "top" }}
              />

              <PillButton
                title={i18n.t("review.submit")}
                onPress={() => mutation.mutate()}
                loading={mutation.isPending}
                disabled={rating === 0}
              />
            </View>
          </GlassCard>
        </View>
      </KeyboardAvoidingView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 20, fontFamily: Fonts.display, color: Colors.ink },
  form: { gap: 20 },
  ratingSection: { alignItems: "center", gap: 12 },
  label: { fontSize: 15, fontFamily: Fonts.bodySemibold, color: Colors.ink },
});
