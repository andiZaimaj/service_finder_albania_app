import { apiClient } from "./client";
import { mockProposals } from "./mock";
import type { Proposal } from "@/types/api";

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === "true";

export async function getJobProposals(jobId: string): Promise<Proposal[]> {
  if (USE_MOCK) return mockProposals.filter((p) => p.jobId === jobId);
  const response = await apiClient.get<Proposal[]>(`/jobs/${jobId}/proposals`);
  return response.data;
}

export async function submitProposal(jobId: string, data: { message: string; priceEstimate: number }): Promise<Proposal> {
  if (USE_MOCK) {
    const proposal: Proposal = {
      id: `p${Date.now()}`,
      jobId,
      workerId: "w1",
      message: data.message,
      priceEstimate: data.priceEstimate,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };
    return proposal;
  }
  const response = await apiClient.post<Proposal>(`/jobs/${jobId}/proposals`, data);
  return response.data;
}

export async function updateProposalStatus(proposalId: string, status: "ACCEPTED" | "REJECTED"): Promise<Proposal> {
  if (USE_MOCK) {
    const proposal = mockProposals.find((p) => p.id === proposalId);
    if (!proposal) throw new Error("Proposal not found");
    proposal.status = status;
    return proposal;
  }
  const response = await apiClient.patch<Proposal>(`/proposals/${proposalId}`, { status });
  return response.data;
}

export async function getMyProposals(): Promise<Proposal[]> {
  if (USE_MOCK) return mockProposals;
  const response = await apiClient.get<Proposal[]>("/proposals/mine");
  return response.data;
}
