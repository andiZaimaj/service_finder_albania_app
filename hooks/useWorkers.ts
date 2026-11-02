import { useQuery } from "@tanstack/react-query";
import * as workersApi from "@/lib/api/workers";

export function useWorkers(filters?: workersApi.WorkerFilters) {
  return useQuery({
    queryKey: ["workers", filters],
    queryFn: () => workersApi.getWorkers(filters),
  });
}

export function useWorker(id: string) {
  return useQuery({
    queryKey: ["worker", id],
    queryFn: () => workersApi.getWorker(id),
    enabled: !!id,
  });
}

export function useWorkerReviews(workerId: string) {
  return useQuery({
    queryKey: ["workerReviews", workerId],
    queryFn: () => workersApi.getWorkerReviews(workerId),
    enabled: !!workerId,
  });
}
