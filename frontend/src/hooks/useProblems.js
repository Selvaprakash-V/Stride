import { useQuery } from "@tanstack/react-query";
import { problemApi } from "../api/problems";

export const useProblems = () => {
  return useQuery({
    queryKey: ["problems"],
    queryFn: problemApi.getProblems,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useProblemById = (id) => {
  return useQuery({
    queryKey: ["problem", id],
    queryFn: () => problemApi.getProblemById(id),
    enabled: !!id,
    staleTime: 1000 * 60,
  });
};
