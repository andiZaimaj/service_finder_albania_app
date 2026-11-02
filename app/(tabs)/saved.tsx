import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { AppBackground } from "@/components/ui/AppBackground";
import { WorkerCard } from "@/components/ui/WorkerCard";
import { BookmarkIcon } from "@/components/ui/SvgIcons";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";
import { useSavedStore } from "@/store/savedStore";
import { useWorkers } from "@/hooks/useWorkers";
import i18n from "@/lib/i18n";

export default function SavedScreen() {
  const savedIds = useSavedStore((s) => s.savedWorkerIds);
  const { data: allWorkers } = useWorkers();

  const savedWorkers = (allWorkers || []).filter((w: { id: string }) => savedIds.includes(w.id));

  return (
    <AppBackground>
      <View style={styles.container}>
        <Text style={styles.title}>{i18n.t("saved.title")}</Text>

        <FlatList
          data={savedWorkers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <WorkerCard worker={item} />
            </View>
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <BookmarkIcon size={48} color={Colors.sageSoft} />
              <Text style={styles.emptyText}>{i18n.t("saved.noSaved")}</Text>
            </View>
          }
          ListFooterComponent={<View style={{ height: 100 }} />}
        />
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.display,
    color: Colors.ink,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  list: {
    paddingTop: 4,
  },
  card: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  empty: {
    alignItems: "center",
    paddingTop: 80,
    gap: 16,
  },
  emptyText: {
    fontSize: 15,
    fontFamily: Fonts.body,
    color: Colors.inkMute,
  },
});
