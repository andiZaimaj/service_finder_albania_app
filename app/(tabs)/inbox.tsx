import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import { router } from "expo-router";
import { AppBackground } from "@/components/ui/AppBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { Avatar } from "@/components/ui/Avatar";
import { MessageCircleIcon } from "@/components/ui/SvgIcons";
import { Colors } from "@/constants/colors";
import { getFullName } from "@/lib/utils";
import { Fonts } from "@/constants/typography";
import { useAuthStore } from "@/store/authStore";
import { useConversations } from "@/hooks/useMessages";
import i18n from "@/lib/i18n";

export default function InboxScreen() {
  const user = useAuthStore((s) => s.user);
  const { data: conversations, isLoading, refetch, isRefetching } = useConversations();

  if (!user) {
    return (
      <AppBackground>
        <View style={styles.empty}>
          <MessageCircleIcon size={48} color={Colors.sageSoft} />
          <Text style={styles.emptyText}>Sign in to view messages</Text>
        </View>
      </AppBackground>
    );
  }

  return (
    <AppBackground>
      <View style={styles.container}>
        <Text style={styles.title}>{i18n.t("inbox.title")}</Text>

        <FlatList
          data={conversations || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const timeStr = new Date(item.lastMessageAt).toLocaleDateString();
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push(`/messages/${item.otherUser.id}`)}
                style={styles.cardWrapper}
              >
                <GlassCard>
                  <View style={styles.convRow}>
                    <Avatar name={getFullName(item.otherUser)} size={48} />
                    <View style={styles.convInfo}>
                      <View style={styles.convHeader}>
                        <Text style={styles.convName}>{getFullName(item.otherUser)}</Text>
                        <Text style={styles.convTime}>{timeStr}</Text>
                      </View>
                      <Text style={styles.convMessage} numberOfLines={1}>
                        {item.lastMessage}
                      </Text>
                    </View>
                    {item.unreadCount > 0 && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.unreadCount}</Text>
                      </View>
                    )}
                  </View>
                </GlassCard>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={Colors.sage} />
          }
          ListEmptyComponent={
            isLoading ? (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>{i18n.t("common.loading")}</Text>
              </View>
            ) : (
              <View style={styles.empty}>
                <MessageCircleIcon size={48} color={Colors.sageSoft} />
                <Text style={styles.emptyText}>{i18n.t("inbox.noMessages")}</Text>
              </View>
            )
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
  cardWrapper: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  convRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  convInfo: {
    flex: 1,
    gap: 4,
  },
  convHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  convName: {
    fontSize: 15,
    fontFamily: Fonts.bodySemibold,
    color: Colors.ink,
  },
  convTime: {
    fontSize: 12,
    fontFamily: Fonts.body,
    color: Colors.inkMute,
  },
  convMessage: {
    fontSize: 13,
    fontFamily: Fonts.body,
    color: Colors.inkSoft,
  },
  badge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.sage,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 11,
    fontFamily: Fonts.bodySemibold,
    color: Colors.white,
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
