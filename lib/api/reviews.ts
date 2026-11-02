import { apiClient } from "./client";
import type { Review } from "@/types/api";

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === "true";

export async function createReview(data: { workerId: string; rating: number; comment?: string }): Promise<Review> {
  if (USE_MOCK) {
    return {
      id: `r${Date.now()}`,
      workerId: data.workerId,
      clientId: "c1",
      rating: data.rating,
      comment: data.comment,
      createdAt: new Date().toISOString(),
    };
  }
  const response = await apiClient.post<Review>("/reviews", data);
  return response.data;
}
