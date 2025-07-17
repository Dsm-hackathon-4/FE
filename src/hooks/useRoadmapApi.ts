import { useQuery } from "@tanstack/react-query";
import {
  getDetailRoadmap,
  getRoadmapChapters,
  getRoadmaps,
  getRoadmapChaptersProblems,
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

export const useRoadmapChaptersProblems = (
  roadmapId: number | undefined,
  chapterId: number | undefined
) => {
  return useQuery({
    queryKey: ["getRoadmapChaptersProblems", roadmapId, chapterId],
    queryFn: () => {
      if (roadmapId === undefined || chapterId === undefined) {
        throw new Error(
          "Roadmap ID and Chapter ID are required for detail roadmap query."
        );
      }
      return getRoadmapChaptersProblems(roadmapId, chapterId);
    },
    enabled: roadmapId !== undefined && chapterId !== undefined,
  });
};
