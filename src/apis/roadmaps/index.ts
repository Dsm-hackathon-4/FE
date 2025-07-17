import instance from "../axios";
import {
  GetRoadmapsType,
  GetDetailRoadmapType,
  GetRoadmapChaptersType,
} from "./type";

const router = "/roadmaps";

export const getRoadmaps = async () => {
  const res = await instance.get<GetRoadmapsType>(`${router}`);
  return res.data;
};

export const getDetailRoadmap = async (roadmapId: number) => {
  const res = await instance.get<GetDetailRoadmapType>(
    `${router}/${roadmapId}`
  );
  return res.data;
};

export const getRoadmapChapters = async (roadmapId: number) => {
  const res = await instance.get<GetRoadmapChaptersType>(
    `${router}/${roadmapId}/chapters`
  );
  return res.data;
};
