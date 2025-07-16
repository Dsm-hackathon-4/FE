import { useMutation } from "@tanstack/react-query";
import { solveProblem } from "../apis/problems";

export const useSolveProblem = () => {
  return useMutation({
    mutationFn: ({
      problemId,
      answer,
    }: {
      problemId: number;
      answer: string;
    }) => solveProblem(problemId, answer),
  });
};
