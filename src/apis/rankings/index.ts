import instance from "../axios";
import { GetRankingsType } from "./type";

const router = "/rankings";

export const getRankings = async () => {
  const res = await instance.get<GetRankingsType>(`${router}`);
  return res.data;
};
