import { LeaderboardIcon, Rank1, Rank2, Rank3, UserIcon } from "@/assets";
import { theme } from "@/themes";
import styled from "@emotion/styled";
import { useRankingApi } from "@/hooks";

export const RankPage = () => {
  const { data } = useRankingApi();
  console.log(data);

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
          {data?.rankings.slice(0, 3).map((item) => (
            <TopRanker key={item.rank} rank={item.rank}>
              <img
                src={item.profile_image_url}
                alt=""
                style={{ width: "60px", height: "60px", borderRadius: "50%" }}
              />
              <span style={theme.font.t1}>{item.name}</span>
              <span style={theme.font.b1}>{item.total_xp} XP</span>
            </TopRanker>
          ))}
        </Leaderboard>
        <Rank>
          {data?.rankings.map((item) => (
            <RankItem key={item.rank}>
              <User>
                {item.rank === 1 && (
                  <img
                    src={Rank1}
                    alt=""
                    style={{ width: "30px", height: "30px" }}
                  />
                )}
                {item.rank === 2 && (
                  <img
                    src={Rank2}
                    alt=""
                    style={{ width: "30px", height: "30px" }}
                  />
                )}
                {item.rank === 3 && (
                  <img
                    src={Rank3}
                    alt=""
                    style={{ width: "30px", height: "30px" }}
                  />
                )}
                {item.rank > 3 && <Ranking>{item.rank}</Ranking>}
                <Info>
                  <img
                    src={item.profile_image_url}
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                  <span style={theme.font.t2}>{item.name}</span>
                </Info>
              </User>
              <span style={{ ...theme.font.t2, color: theme.color.zinc[400] }}>
                {item.total_xp} XP
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
