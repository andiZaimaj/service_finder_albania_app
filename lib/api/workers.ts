import { apiClient } from "./client";
import { mockWorkers, mockReviews } from "./mock";
import type { Worker, Review } from "@/types/api";
import { getFullName } from "@/lib/utils";

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === "true";

export interface WorkerFilters {
  category?: string;
  city?: string;
  search?: string;
}

// The backend (Prisma WorkerProfile) shape differs from the app's Worker type,
// which was designed around mock data. Normalize it here so every screen that
// consumes a worker gets a consistent shape.
function mapWorker(raw: any): Worker {
  return {
    id: raw.id,
    userId: raw.userId,
    user: raw.user ?? { id: raw.userId, firstName: "", lastName: "" },
    bio: raw.bio ?? "",
    businessName: raw.businessName ?? undefined,
    cities: Array.isArray(raw.cities)
      ? raw.cities.map((c: any) => (typeof c === "string" ? c : c?.city)).filter(Boolean)
      : [],
    categories: Array.isArray(raw.categories)
      ? raw.categories
          .map((c: any) =>
            typeof c === "string" ? c : c?.category?.slug ?? c?.category?.name ?? c?.categoryId,
          )
          .filter(Boolean)
      : [],
    rating: Number(raw.averageRating ?? raw.rating ?? 0),
    reviewCount: Number(raw.totalReviews ?? raw.reviewCount ?? 0),
    jobsCompleted: Number(raw.jobsCompleted ?? 0),
    startsAt: raw.startsAt != null ? Number(raw.startsAt) : undefined,
    verified: raw.isIdVerified ?? raw.verified ?? false,
    idUploaded: raw.idUploaded ?? raw.nationalIdUrl != null,
    subscription:
      raw.subscription ??
      (raw.subscriptionTier
        ? {
            id: raw.id,
            workerId: raw.id,
            tier: raw.subscriptionTier,
            status: raw.subscriptionStatus,
            currentPeriodEnd: raw.subscriptionExpiresAt,
          }
        : undefined),
  };
}

export async function getWorkers(filters?: WorkerFilters): Promise<Worker[]> {
  if (USE_MOCK) {
    let workers = [...mockWorkers];
    if (filters?.category) {
      workers = workers.filter((w) => w.categories.includes(filters.category!));
    }
    if (filters?.city) {
      workers = workers.filter((w) => w.cities.includes(filters.city!));
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      workers = workers.filter(
        (w) =>
          getFullName(w.user).toLowerCase().includes(q) ||
          w.categories.some((c) => c.toLowerCase().includes(q))
      );
    }
    return workers;
  }
  const response = await apiClient.get<any[]>("/workers", { params: filters });
  return Array.isArray(response.data) ? response.data.map(mapWorker) : [];
}

export async function getWorker(id: string): Promise<Worker> {
  if (USE_MOCK) {
    const worker = mockWorkers.find((w) => w.id === id);
    if (!worker) throw new Error("Worker not found");
    return worker;
  }
  const response = await apiClient.get<any>(`/workers/${id}`);
  return mapWorker(response.data);
}

export async function getWorkerReviews(workerId: string): Promise<Review[]> {
  if (USE_MOCK) {
    return mockReviews.filter((r) => r.workerId === workerId);
  }
  const response = await apiClient.get<Review[]>(`/workers/${workerId}/reviews`);
  return response.data;
}

export async function uploadWorkerId(formData: FormData): Promise<void> {
  if (USE_MOCK) return;
  await apiClient.post("/workers/upload-id", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function updateWorkerProfile(data: Partial<Worker>): Promise<Worker> {
  if (USE_MOCK) return mockWorkers[0];
  const response = await apiClient.patch<Worker>("/workers/profile", data);
  return response.data;
}
