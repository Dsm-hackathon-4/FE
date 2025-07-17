export interface GetRoadmapsType {
  id: number;
  title: string;
  description: string;
  category_name: string;
  is_completed: boolean;
  icon_url: string;
  bg_color: string;
}

export interface GetRoadmapChaptersProblemType {
  id: number;
  type: "BLANK_CHOICE" | "SELECT" | "DEFINE" | string; // 다른 타입 있을 수 있으니 string 포함
  title: string;
  content: string;
  hint: string;
  difficulty: "EASY" | "MEDIUM" | "HARD" | string;
  xp_reward: number;
  image_url: string | null;
  choices: string[]; // 선택지 문제용
  category: {
    id: number;
    name: string;
    description: string;
    icon_url: string;
  };
}
export interface GetDetailRoadmapType {
  roadmap: {
    id: number;
    title: string;
    description: string;
    category_name: string;
    is_completed: boolean;
    icon_url: string;
    bg_color: string;
  };
  problems: {
    easy: ProblemType[];
    medium: ProblemType[];
    hard: ProblemType[];
  };
}

export interface Chapter {
  id: number;
  title: string;
  description: string;
  order_index: number;
  completed_problems: number;
  total_problems: number;
  progress_rate: number;
  is_completed: boolean;
  icon_url: string;
}

export interface GetChapterProblemsType {
  problems: ProblemType[];
}
export type GetRoadmapChaptersType = Chapter[];

interface ProblemType {
  id: number;
  title: string;
  content: string;
  type: "MULTIPLE_CHOICE" | "SUBJECTIVE" | string;
  difficulty: "EASY" | "MEDIUM" | "HARD" | string;
  xp_reward: number;
  category: {
    id: number;
    name: string;
    description: string;
    icon_url: string;
  };
  image_url: string;
  hint: string;
  choices: {
    id: number;
    content: string;
    order_index: number;
  }[];
}
