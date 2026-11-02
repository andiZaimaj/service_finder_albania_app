import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as jobsApi from "@/lib/api/jobs";
import * as proposalsApi from "@/lib/api/proposals";

export function useMyJobs() {
  return useQuery({
    queryKey: ["myJobs"],
    queryFn: jobsApi.getMyJobs,
  });
}

export function useBrowseJobs(filters?: { category?: string; city?: string }) {
  return useQuery({
    queryKey: ["browseJobs", filters],
    queryFn: () => jobsApi.getBrowseJobs(filters),
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => jobsApi.getJob(id),
    enabled: !!id,
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: jobsApi.CreateJobData) => jobsApi.createJob(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myJobs"] });
    },
  });
}

export function useJobProposals(jobId: string) {
  return useQuery({
    queryKey: ["proposals", jobId],
    queryFn: () => proposalsApi.getJobProposals(jobId),
    enabled: !!jobId,
  });
}

export function useSubmitProposal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { jobId: string; message: string; priceEstimate: number }) =>
      proposalsApi.submitProposal(data.jobId, {
        message: data.message,
        priceEstimate: data.priceEstimate,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["browseJobs"] });
    },
  });
}

export function useUpdateProposalStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { proposalId: string; status: "ACCEPTED" | "REJECTED" }) =>
      proposalsApi.updateProposalStatus(data.proposalId, data.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
    },
  });
}
