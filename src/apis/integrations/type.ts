export interface AiProblem {
  totalElements: number;
  totalPages: number;
  size: number;
  content: AiProblemItem[];
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    pageSize: number;
    paged: boolean;
    pageNumber: number;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface AiProblemItem {
  id: number;
  problemType: "FILL_BLANK" | "SELECT" | "SUBJECTIVE"; // 필요시 다른 타입도 추가
  content: string;
  choices: string[];
  difficulty: number;
  createdAt: string; // 혹은 Date, 파싱 여부에 따라
}

export interface AiSummary {
  new_review_count: number;
  ongoing_review_count: number;
  total_review_count: number;
}
