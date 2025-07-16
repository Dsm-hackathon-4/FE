import { theme } from "@/themes";
import styled from "@emotion/styled";
import { Continuous, Rank, UserIcon, Xp } from "@/assets";

export const ProfilePage = () => {
  const infos = [
    {
      title: "총 XP",
      icon: Xp,
      color: theme.color.xp,
      value: "1,234,567",
      info: "+250 오늘",
      infoColor: theme.color.green[600],
    },
    {
      title: "현재 등수",
      icon: Rank,
      color: theme.color.rank,
      value: "#7",
      info: "상위 15%",
      infoColor: "#2563EB",
    },
    {
      title: "연속 학습",
      icon: Continuous,
      color: theme.color.continuous,
      value: "42일",
      info: "최고 기록!",
      infoColor: "#EA580C",
    },
  ];

  const goalInfo = [
    {
      title: "목표 풀이 문제",
      value: "2 / 5",
      degree: 2 / 5,
      color: "linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)",
    },
    {
      title: "XP 획득",
      value: "250 / 300",
      degree: 250 / 300,
      color: "linear-gradient(90deg, #4ADE80 0%, #16A34A 100%)",
    },
  ];

  return (
    <Wrapper>
      <Title>
        <span style={theme.font.h2}>마이페이지</span>
        <span style={{ ...theme.font.b1, color: theme.color.zinc[500] }}>
          학습 진행 상황과 성과를 확인해보세요
        </span>
      </Title>
      <Contents>
        <User>
          <UserImg src={UserIcon} alt="유저프로필" />
          <UserContents>
            <span style={theme.font.h4}>김철수</span>
            <span style={theme.font.b2}>데이터베이스</span>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img src={Continuous} alt="연속이미지" />
              <span style={theme.font.b1}>42일 연속</span>
            </span>
          </UserContents>
        </User>
        <UserInfo>
          {infos.map((info, idx) => (
            <Info key={idx}>
              <InfoTitle>
                <ImgDiv color={info.color}>
                  <img src={info.icon} alt="" />
                </ImgDiv>
                <span
                  style={{ ...theme.font.l2, color: theme.color.zinc[500] }}
                >
                  {info.title}
                </span>
              </InfoTitle>
              <InfoContents>
                <span style={theme.font.h3}>{info.value}</span>
                <span style={{ color: info.infoColor }}>{info.info}</span>
              </InfoContents>
            </Info>
          ))}
        </UserInfo>
        <DailyGoal>
          <span style={theme.font.t3}>일일 목표 진행률</span>
          <GoalContents>
            {goalInfo.map((info, idx) => (
              <GoalInfo key={idx}>
                <GoalInfoTitle>
                  <span>{info.title}</span>
                  <span>{info.value}</span>
                </GoalInfoTitle>
                <Progress>
                  <ProgressFill
                    width={`${info.degree * 100}%`}
                    color={info.color}
                  />
                </Progress>
              </GoalInfo>
            ))}
          </GoalContents>
        </DailyGoal>
      </Contents>
    </Wrapper>
  );
};

const Progress = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${theme.color.zinc[200]};
  border-radius: 4px;
`;

const ProgressFill = styled.span<{ width: string; color: string }>`
  display: block;
  height: 100%;
  background: ${(props) => props.color};
  border-radius: 4px;
  width: ${(props) => props.width};
`;

const GoalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const GoalInfoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font: ${theme.font.l2};
  color: ${theme.color.zinc[500]};
`;

const GoalContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DailyGoal = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 20px 140px 24px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 10px 15px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  gap: 14px;
`;

const InfoContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  justify-content: center;
`;

const InfoTitle = styled.div`
  display: flex;
  width: 214px;
  align-items: center;
  justify-content: space-between;
`;

const ImgDiv = styled.div<{ color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Info = styled.div`
  width: 367px;
  height: 172px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 10px 15px rgba(0, 0, 0, 0.1);
  padding: 24px 0px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.15), 0px 16px 24px rgba(0, 0, 0, 0.15);
  }
`;

const UserInfo = styled.div`
  display: flex;
  gap: 10px;
`;

const UserContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: left;
`;

const UserImg = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
`;

const User = styled.div`
  width: 1120px;
  display: flex;
  gap: 24px;
  padding: 32px 0px 32px 32px;
  border-radius: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 10px 15px rgba(0, 0, 0, 0.1);
`;

const Contents = styled.div`
  width: 1120px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Title = styled.div`
  width: 1120px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: left;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  padding-top: 60px;
  align-items: center;
`;
