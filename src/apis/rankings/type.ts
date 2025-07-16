interface RankingUser {
  rank: number;
  user_id: string;
  name: string;
  profile_image_url: string;
  total_xp: number;
  is_me: boolean;
}

export interface GetRankingsType {
  rankings: RankingUser[];
  my_ranking: RankingUser;
  total_users: number;
}
