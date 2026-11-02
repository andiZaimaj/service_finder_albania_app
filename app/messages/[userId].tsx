import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { AppBackground } from "@/components/ui/AppBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { Field } from "@/components/ui/Field";
import { IconButton } from "@/components/ui/IconButton";
import { ChevronLeftIcon, SendIcon } from "@/components/ui/SvgIcons";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/typography";
import { useAuthStore } from "@/store/authStore";
import { useMessages, useSendMessage } from "@/hooks/useMessages";
import i18n from "@/lib/i18n";
import type { FlatList as FlatListType } from "react-native";

export default function ConversationScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const currentUser = useAuthStore((s) => s.user);
  const { data: messages } = useMessages(userId);
  const sendMutation = useSendMessage();
  const [text, setText] = useState("");
  const flatListRef = useRef<FlatListType>(null);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMutation.mutate({ receiverId: userId, content: text.trim() });
    setText("");
  };

  const sortedMessages = [...(messages || [])].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <AppBackground safeArea={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={styles.header}>
          <IconButton onPress={() => router.back()}>
            <ChevronLeftIcon />
          </IconButton>
          <Text style={styles.headerTitle}>{i18n.t("inbox.title")}</Text>
          <View style={{ width: 44 }} />
        </View>

        <FlatList
          ref={flatListRef}
          data={sortedMessages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isMine = item.senderId === currentUser?.id;
            return (
              <View style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleTheirs]}>
                <View
                  style={[
                    styles.bubbleContent,
                    isMine ? styles.bubbleContentMine : styles.bubbleContentTheirs,
                  ]}
                >
                  <Text style={[styles.bubbleText, isMine && styles.bubbleTextMine]}>
                    {item.content}
                  </Text>
                  <Text style={[styles.bubbleTime, isMine && styles.bubbleTimeMine]}>
                    {new Date(item.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              </View>
            );
          }}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Start a conversation</Text>
            </View>
          }
        />

        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <View style={styles.inputField}>
              <Field
                placeholder={i18n.t("inbox.typeMessage")}
                value={text}
                onChangeText={setText}
                returnKeyType="send"
                onSubmitEditing={handleSend}
              />
            </View>
            <TouchableOpacity
              onPress={handleSend}
              style={styles.sendButton}
              activeOpacity={0.7}
            >
              <SendIcon size={22} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
  },
  headerTitle: { fontSize: 20, fontFamily: Fonts.display, color: Colors.ink },
  messageList: { paddingHorizontal: 20, paddingBottom: 10 },
  bubble: { marginBottom: 8 },
  bubbleMine: { alignItems: "flex-end" },
  bubbleTheirs: { alignItems: "flex-start" },
  bubbleContent: {
    maxWidth: "78%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  bubbleContentMine: {
    backgroundColor: Colors.sage,
    borderBottomRightRadius: 4,
  },
  bubbleContentTheirs: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.sand,
    borderBottomLeftRadius: 4,
  },
  bubbleText: { fontSize: 14, fontFamily: Fonts.body, color: Colors.ink2, lineHeight: 20 },
  bubbleTextMine: { color: Colors.white },
  bubbleTime: { fontSize: 10, fontFamily: Fonts.body, color: Colors.inkMute, marginTop: 4, alignSelf: "flex-end" },
  bubbleTimeMine: { color: Colors.sageSoft },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: Colors.sand,
    backgroundColor: "rgba(244,236,219,0.5)",
  },
  inputRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  inputField: { flex: 1 },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(74,127,118,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 60 },
  emptyText: { fontSize: 14, fontFamily: Fonts.body, color: Colors.inkMute },
});
