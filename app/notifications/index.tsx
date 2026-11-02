import React from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { router } from "expo-router";
import { AppBackground } from "@/components/ui/AppBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { PillButton } from "@/components/ui/PillButton";
import { IconButton } from "@/components/ui/IconButton";
import { ChevronLeftIcon, BellIcon } from "@/components/ui/SvgIcons";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";
import { useNotifications, useMarkAllRead } from "@/hooks/useNotifications";
import i18n from "@/lib/i18n";

export default function NotificationsScreen() {
  const { data: notifications, isLoading, refetch, isRefetching } = useNotifications();
  const markAllMutation = useMarkAllRead();

  const hasUnread = notifications?.some((n: { isRead: boolean }) => !n.isRead);

  return (
    <AppBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton onPress={() => router.back()}>
            <ChevronLeftIcon />
          </IconButton>
          <Text style={styles.headerTitle}>{i18n.t("notifications.title")}</Text>
          <View style={{ width: 44 }} />
        </View>

        {hasUnread && (
          <View style={styles.markAll}>
            <PillButton
              title={i18n.t("notifications.markAllRead")}
              variant="ghost"
              size="sm"
              onPress={() => markAllMutation.mutate()}
              loading={markAllMutation.isPending}
            />
          </View>
        )}

        <FlatList
          data={notifications || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <GlassCard>
                <View style={styles.notifRow}>
                  {!item.isRead && <View style={styles.unreadDot} />}
                  <View style={styles.notifContent}>
                    <Text style={styles.notifTitle}>{item.title}</Text>
                    <Text style={styles.notifBody}>{item.body}</Text>
                    <Text style={styles.notifTime}>
                      {new Date(item.createdAt).toLocaleString()}
                    </Text>
                  </View>
                </View>
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
              <BellIcon size={48} color={Colors.sageSoft} />
              <Text style={styles.emptyText}>
                {isLoading ? i18n.t("common.loading") : i18n.t("notifications.noNotifications")}
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
    marginBottom: 8,
  },
  headerTitle: { fontSize: 20, fontFamily: Fonts.display, color: Colors.ink },
  markAll: { paddingHorizontal: 20, alignItems: "flex-end", marginBottom: 8 },
  list: { paddingHorizontal: 20 },
  cardWrapper: { marginBottom: 10 },
  notifRow: { flexDirection: "row", gap: 10 },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.sage,
    marginTop: 6,
  },
  notifContent: { flex: 1, gap: 2 },
  notifTitle: { fontSize: 14, fontFamily: Fonts.bodySemibold, color: Colors.ink },
  notifBody: { fontSize: 13, fontFamily: Fonts.body, color: Colors.ink2, lineHeight: 19 },
  notifTime: { fontSize: 11, fontFamily: Fonts.body, color: Colors.inkMute, marginTop: 4 },
  empty: { alignItems: "center", paddingTop: 80, gap: 16 },
  emptyText: { fontSize: 15, fontFamily: Fonts.body, color: Colors.inkMute },
});
