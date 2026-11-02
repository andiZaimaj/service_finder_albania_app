import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as notificationsApi from "@/lib/api/notifications";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: notificationsApi.getNotifications,
  });
}

export function useMarkAllRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationsApi.markAllNotificationsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
