import instance from "../axios";
import { GetMyPageType } from "./type";

const router = "/mypage";

export const getMyPage = async () => {
  const res = await instance.get<GetMyPageType>(`${router}`);
  return res.data;
};
