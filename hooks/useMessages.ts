import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as messagesApi from "@/lib/api/messages";

export function useConversations() {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: messagesApi.getConversations,
  });
}

export function useMessages(userId: string) {
  return useQuery({
    queryKey: ["messages", userId],
    queryFn: () => messagesApi.getMessages(userId),
    enabled: !!userId,
    refetchInterval: 5000,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { receiverId: string; content: string; jobId?: string }) =>
      messagesApi.sendMessage(data.receiverId, data.content, data.jobId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["messages", variables.receiverId] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}
