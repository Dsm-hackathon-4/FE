import { useQuery } from "@tanstack/react-query";
import { getRankings } from "@/apis/rankings";

export const useRankingApi = () => {
  return useQuery({
    queryKey: ["getRankings"],
    queryFn: getRankings,
  });
};
