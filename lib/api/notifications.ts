import { apiClient } from "./client";
import { mockNotifications } from "./mock";
import type { Notification } from "@/types/api";

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === "true";

export async function getNotifications(): Promise<Notification[]> {
  if (USE_MOCK) return mockNotifications;
  const response = await apiClient.get<Notification[]>("/notifications");
  return response.data;
}

export async function markAllNotificationsRead(): Promise<void> {
  if (USE_MOCK) {
    mockNotifications.forEach((n) => { n.isRead = true; });
    return;
  }
  await apiClient.post("/notifications/mark-all-read");
}
