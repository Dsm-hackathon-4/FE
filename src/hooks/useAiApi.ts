import {
  CreateAiProblem,
  getAiProblem,
  getAiSummary,
  solveAiProblem,
} from "@/apis/integrations";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAiProblem = () => {
  return useMutation({
    mutationFn: (userId: string) => CreateAiProblem(userId),
  });
};

export const useGetAiProblem = () => {
  return useQuery({
    queryKey: ["ai-problem"],
    queryFn: getAiProblem,
  });
};

export const useGetAiSummary = () => {
  return useQuery({
    queryKey: ["ai-summary"],
    queryFn: getAiSummary,
  });
};

export const useSolveAiProblem = () => {
  return useMutation({
    mutationFn: ({
      problem_id,
      answer,
    }: {
      problem_id: number;
      answer: string;
    }) => solveAiProblem(problem_id, answer),
  });
};
