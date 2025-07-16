export interface GetMyPageType {
  user_info: UserInfo;
  statistics: Statistics;
  xp_info: XpInfo;
  study_streak: StudyStreak;
  study_status: StudyStatus;
  goals: Goals;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
  profile_image_url: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  age: string;
  provider: "GOOGLE" | "KAKAO" | "GITHUB";
}

interface Statistics {
  total_xp: number;
  current_streak: number;
  daily_rank: number;
  weekly_rank: number;
  monthly_rank: number;
  total_problems: number;
  correct_problems: number;
  accuracy: number;
}

interface XpInfo {
  total_xp: number;
  today_xp: number;
  weekly_xp: number;
  monthly_xp: number;
}

interface StudyStreak {
  current_streak: number;
  max_streak: number;
  total_study_days: number;
  last_study_date: string; // ISO 형식 문자열
}

interface StudyStatus {
  total_problems: number;
  correct_problems: number;
  review_problems: number;
  recent_activity: RecentActivity[];
}

interface RecentActivity {
  date: string;
  problem_count: number;
  xp_earned: number;
}

interface Goals {
  daily_goal: number;
  today_progress: number;
  achievement_rate: number;
  streak: number;
}
