import instance from "../axios";

const router = "/problems";

export const solveProblem = async (problemId: number, answer: string) => {
  const res = await instance.post(`${router}/${problemId}/solve`, { answer });
  return res.data;
};
