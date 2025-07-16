import { useQuery } from "@tanstack/react-query";
import { getMyPage } from "@/apis/mypage";

export const useMyPage = () => {
  return useQuery({
    queryKey: ["myPage"],
    queryFn: getMyPage,
  });
};
