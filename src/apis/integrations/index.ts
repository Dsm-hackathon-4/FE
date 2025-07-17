import instance from "../axios";
import { AiProblem, AiSummary } from "./type";

const router = "/integrations";

export const CreateAiProblem = async (userId: string) => {
  const res = await instance.post(`${router}/generate-problems`, {
    user_id: userId,
  });
  return res.data;
};

export const getAiProblem = async () => {
  const res = await instance.get<AiProblem>(`${router}/ai-problems`);
  return res.data;
};

export const getAiSummary = async () => {
  const res = await instance.get<AiSummary>(`${router}/ai-review/summary`);
  return res.data;
};

export const solveAiProblem = async (problemId: number, answer: string) => {
  const res = await instance.post(`${router}/ai-problems/${problemId}/solve`, {
    answer,
  });
  return res.data;
};
