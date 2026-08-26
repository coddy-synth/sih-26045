import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { Case, CreateCasePayload } from "@/types";

// Fetch all cases for the Dashboard
export const useCases = () => {
  return useQuery({
    queryKey: ["cases"],
    queryFn: async (): Promise<Case[]> => {
      const { data } = await apiClient.get("/cases");
      return data;
    },
  });
};

// Fetch a single case by ID
export const useCase = (id: string) => {
  return useQuery({
    queryKey: ["case", id],
    queryFn: async (): Promise<Case> => {
      const { data } = await apiClient.get(`/cases/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

// Create a new case
export const useCreateCase = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (payload: CreateCasePayload) => {
      const { data } = await apiClient.post("/cases", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    },
  });
};
