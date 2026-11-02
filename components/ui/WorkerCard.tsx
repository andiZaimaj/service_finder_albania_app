import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { GlassCard } from "./GlassCard";
import { Avatar } from "./Avatar";
import { Stars } from "./Stars";
import { Chip } from "./Chip";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";
import { CATEGORIES } from "@/constants/categories";
import { getFullName } from "@/lib/utils";
import type { Worker } from "@/types/api";
import { useLanguageStore } from "@/store/languageStore";

interface WorkerCardProps {
  worker: Worker;
}

export function WorkerCard({ worker }: WorkerCardProps) {
  const locale = useLanguageStore((s) => s.locale);

  const categoryLabel = (key: string) => {
    const cat = CATEGORIES.find((c) => c.key === key);
    return cat ? (locale === "sq" ? cat.labelSq : cat.labelEn) : key;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push(`/worker/${worker.id}`)}
    >
      <GlassCard>
        <View style={styles.row}>
          <Avatar name={getFullName(worker.user)} size={52} />
          <View style={styles.info}>
            <Text style={styles.name}>{getFullName(worker.user)}</Text>
            <View style={styles.meta}>
              <Text style={styles.metaText}>
                {worker.categories.map(categoryLabel).join(", ")}
              </Text>
              <Text style={styles.dot}>·</Text>
              <Text style={styles.metaText}>{worker.cities[0]}</Text>
            </View>
            <View style={styles.ratingRow}>
              <Stars rating={worker.rating} size={14} />
              <Text style={styles.ratingText}>{worker.rating.toFixed(1)}</Text>
              <Text style={styles.reviewCount}>({worker.reviewCount})</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.chips}>
            {worker.verified && <Chip label="Verified" variant="sage" active />}
            {worker.rating >= 4.7 && <Chip label="Top Rated" variant="sand" active />}
          </View>
          {worker.startsAt != null && (
            <Text style={styles.price}>
              {worker.startsAt.toLocaleString()} L
            </Text>
          )}
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 14,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 16,
    color: Colors.ink,
    fontFamily: Fonts.bodySemibold,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: Colors.inkSoft,
    fontFamily: Fonts.body,
  },
  dot: {
    fontSize: 13,
    color: Colors.inkMute,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  ratingText: {
    fontSize: 13,
    color: Colors.ink,
    fontFamily: Fonts.bodySemibold,
  },
  reviewCount: {
    fontSize: 12,
    color: Colors.inkMute,
    fontFamily: Fonts.body,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  chips: {
    flexDirection: "row",
    gap: 6,
  },
  price: {
    fontSize: 15,
    color: Colors.sage,
    fontFamily: Fonts.bodySemibold,
  },
});
