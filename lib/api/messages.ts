import { apiClient } from "./client";
import { mockConversations, mockMessages } from "./mock";
import type { Conversation, Message } from "@/types/api";

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === "true";

export async function getConversations(): Promise<Conversation[]> {
  if (USE_MOCK) return mockConversations;
  const response = await apiClient.get<Conversation[]>("/messages/conversations");
  return response.data;
}

export async function getMessages(userId: string): Promise<Message[]> {
  if (USE_MOCK) {
    return mockMessages.filter(
      (m) => m.senderId === userId || m.receiverId === userId
    );
  }
  const response = await apiClient.get<Message[]>(`/messages/${userId}`);
  return response.data;
}

export async function sendMessage(receiverId: string, content: string, jobId?: string): Promise<Message> {
  if (USE_MOCK) {
    return {
      id: `m${Date.now()}`,
      senderId: "c1",
      receiverId,
      jobId,
      content,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
  }
  const response = await apiClient.post<Message>("/messages", { receiverId, content, jobId });
  return response.data;
}

export async function markAsRead(userId: string): Promise<void> {
  if (USE_MOCK) return;
  await apiClient.post(`/messages/${userId}/read`);
}
