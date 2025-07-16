import { LeaderboardIcon, Rank1, Rank2, Rank3, UserIcon } from "@/assets";
import { theme } from "@/themes";
import styled from "@emotion/styled";

export const RankPage = () => {
  const rank = [
    { rank: 1, name: "김철수", xp: 1000, rankIcon: Rank1 },
    { rank: 2, name: "이영희", xp: 900, rankIcon: Rank2 },
    { rank: 3, name: "박민수", xp: 800, rankIcon: Rank3 },
    { rank: 4, name: "최영희", xp: 700 },
    { rank: 5, name: "김민수", xp: 600 },
    { rank: 6, name: "이영희", xp: 500 },
    { rank: 7, name: "박민수", xp: 400 },
    { rank: 8, name: "최영희", xp: 300 },
    { rank: 9, name: "김민수", xp: 200 },
    { rank: 10, name: "이영희", xp: 100 },
  ];
  return (
    <Wrapper>
      <Title>
        <span style={theme.font.h2}>랭킹</span>
        <span style={theme.font.b2}>상위 학습자들의 랭킹을 확인해보세요</span>
      </Title>
      <div
        style={{
          display: "flex",
          gap: "42px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Leaderboard>
          <img src={LeaderboardIcon} alt="" />
          {rank.slice(0, 3).map((item) => (
            <TopRanker key={item.rank} rank={item.rank}>
              <img
                src={UserIcon}
                alt=""
                style={{ width: "60px", height: "60px", borderRadius: "50%" }}
              />
              <span style={theme.font.t1}>{item.name}</span>
              <span style={theme.font.b1}>{item.xp} XP</span>
            </TopRanker>
          ))}
        </Leaderboard>
        <Rank>
          {rank.map((item) => (
            <RankItem key={item.rank}>
              <User>
                {item.rankIcon && (
                  <img
                    src={item.rankIcon}
                    alt=""
                    style={{ width: "30px", height: "30px" }}
                  />
                )}
                {!item.rankIcon && <Ranking>{item.rank}</Ranking>}
                <Info>
                  <img
                    src={UserIcon}
                    alt=""
                    style={{ width: "50px", height: "50px" }}
                  />
                  <span style={theme.font.t2}>{item.name}</span>
                </Info>
              </User>
              <span style={{ ...theme.font.t2, color: theme.color.zinc[400] }}>
                {item.xp} XP
              </span>
            </RankItem>
          ))}
        </Rank>
      </div>
    </Wrapper>
  );
};

const Ranking = styled.div`
  font: ${theme.font.b2};
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 39px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const RankItem = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  width: 1100px;
`;

const Rank = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const Leaderboard = styled.div`
  position: relative;
  width: 600px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const TopRanker = styled.div<{ rank: number }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  color: ${theme.color.black};

  ${(props) => {
    if (props.rank === 1) {
      return `
        top: -80px;
        left: 50%;
        transform: translateX(-50%);
      `;
    } else if (props.rank === 2) {
      return `
        top: -20px;
        left: 60px;
      `;
    } else if (props.rank === 3) {
      return `
        top: 10px;
        right: 70px;
      `;
    }
  }}
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  width: 700px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
  gap: 150px;
`;
