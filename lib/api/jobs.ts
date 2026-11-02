import { apiClient } from "./client";
import { mockJobs } from "./mock";
import type { Job } from "@/types/api";

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === "true";

export interface CreateJobData {
  title: string;
  description: string;
  category: string;
  city: string;
  expiresAt: string;
}

export async function getMyJobs(): Promise<Job[]> {
  if (USE_MOCK) return mockJobs;
  const response = await apiClient.get<Job[]>("/jobs/mine");
  return response.data;
}

export async function getBrowseJobs(filters?: { category?: string; city?: string }): Promise<Job[]> {
  if (USE_MOCK) {
    let jobs = mockJobs.filter((j) => j.status === "OPEN");
    if (filters?.category) jobs = jobs.filter((j) => j.category === filters.category);
    if (filters?.city) jobs = jobs.filter((j) => j.city === filters.city);
    return jobs;
  }
  const response = await apiClient.get<Job[]>("/jobs", { params: filters });
  return response.data;
}

export async function getJob(id: string): Promise<Job> {
  if (USE_MOCK) {
    const job = mockJobs.find((j) => j.id === id);
    if (!job) throw new Error("Job not found");
    return job;
  }
  const response = await apiClient.get<Job>(`/jobs/${id}`);
  return response.data;
}

export async function createJob(data: CreateJobData): Promise<Job> {
  if (USE_MOCK) {
    const job: Job = {
      id: `j${Date.now()}`,
      ...data,
      status: "OPEN",
      clientId: "c1",
      proposalCount: 0,
      createdAt: new Date().toISOString(),
    };
    mockJobs.push(job);
    return job;
  }
  const response = await apiClient.post<Job>("/jobs", data);
  return response.data;
}
