import { useQuery } from "@tanstack/react-query";
import {
  getDetailRoadmap,
  getRoadmapChapters,
  getRoadmaps,
} from "@/apis/roadmaps";

export const useRoadmap = () => {
  return useQuery({ queryKey: ["getRoadmaps"], queryFn: getRoadmaps });
};

export const useDetailRoadmap = (id: number | undefined) => {
  return useQuery({
    queryKey: ["getDetailRoadmap", id],
    queryFn: () => {
      if (id === undefined) {
        throw new Error("Roadmap ID is required for detail roadmap query.");
      }
      return getDetailRoadmap(id);
    },
    enabled: id !== undefined,
  });
};

export const useRoadmapChapters = (id: number | undefined) => {
  return useQuery({
    queryKey: ["getRoadmapChapters", id],
    queryFn: () => {
      if (id === undefined) {
        throw new Error("Roadmap ID is required for detail roadmap query.");
      }
      return getRoadmapChapters(id);
    },
    enabled: id !== undefined,
  });
};
