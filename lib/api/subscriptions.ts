import { apiClient } from "./client";
import type { Subscription } from "@/types/api";

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === "true";

export async function getMySubscription(): Promise<Subscription | null> {
  if (USE_MOCK) return null;
  const response = await apiClient.get<Subscription>("/subscriptions/mine");
  return response.data;
}

export async function checkout(tier: "BASIC" | "PRO"): Promise<{ url: string }> {
  if (USE_MOCK) return { url: "https://checkout.stripe.com/mock" };
  const response = await apiClient.post<{ url: string }>("/subscriptions/checkout", { tier });
  return response.data;
}

export async function cancelSubscription(): Promise<void> {
  if (USE_MOCK) return;
  await apiClient.post("/subscriptions/cancel");
}
