import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import { AppBackground } from "@/components/ui/AppBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { PillButton } from "@/components/ui/PillButton";
import { Chip } from "@/components/ui/Chip";
import { Field } from "@/components/ui/Field";
import { IconButton } from "@/components/ui/IconButton";
import { ChevronLeftIcon } from "@/components/ui/SvgIcons";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";
import { CATEGORIES } from "@/constants/categories";
import { CITIES } from "@/constants/cities";
import { useLanguageStore } from "@/store/languageStore";
import { useCreateJob } from "@/hooks/useJobs";
import i18n from "@/lib/i18n";

export default function CreateJobScreen() {
  const locale = useLanguageStore((s) => s.locale);
  const createMutation = useCreateJob();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  const handleCreate = () => {
    if (!title || !description || !category || !city) return;
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    createMutation.mutate(
      { title, description, category, city, expiresAt },
      { onSuccess: () => router.back() }
    );
  };

  return (
    <AppBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <IconButton onPress={() => router.back()}>
              <ChevronLeftIcon />
            </IconButton>
            <Text style={styles.headerTitle}>{i18n.t("jobs.postJob")}</Text>
            <View style={{ width: 44 }} />
          </View>

          <GlassCard>
            <View style={styles.form}>
              <Field
                label={i18n.t("jobs.title")}
                placeholder={i18n.t("jobs.title")}
                value={title}
                onChangeText={setTitle}
              />
              <Field
                label={i18n.t("jobs.description")}
                placeholder={i18n.t("jobs.description")}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={5}
                style={{ minHeight: 100, textAlignVertical: "top" }}
              />

              <View style={styles.section}>
                <Text style={styles.sectionLabel}>{i18n.t("jobs.category")}</Text>
                <View style={styles.chipGroup}>
                  {CATEGORIES.map((cat) => (
                    <Chip
                      key={cat.key}
                      label={locale === "sq" ? cat.labelSq : cat.labelEn}
                      active={category === cat.key}
                      onPress={() => setCategory(cat.key)}
                    />
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionLabel}>{i18n.t("jobs.city")}</Text>
                <View style={styles.chipGroup}>
                  {CITIES.slice(0, 6).map((c) => (
                    <Chip
                      key={c}
                      label={c}
                      active={city === c}
                      onPress={() => setCity(c)}
                      variant="sand"
                    />
                  ))}
                </View>
              </View>

              <PillButton
                title={i18n.t("jobs.submit")}
                onPress={handleCreate}
                loading={createMutation.isPending}
                disabled={!title || !description || !category || !city}
              />
            </View>
          </GlassCard>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
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
  form: { gap: 16 },
  section: { gap: 8 },
  sectionLabel: {
    fontSize: 13,
    fontFamily: Fonts.bodyMedium,
    color: Colors.ink2,
    marginLeft: 4,
  },
  chipGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
