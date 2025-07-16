import { theme } from "@/themes";
import styled from "@emotion/styled";
import { Correct, ResultIcon, Star, ResultCheck } from "@/assets";
import { Button } from "@/components";

export const ResultPage = () => {
  return (
    <Wrapper>
      <Result>
        <img
          src={ResultIcon}
          alt="result"
          style={{ width: "128px", height: "128px" }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "70px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "32px" }}
          >
            <Text>
              <span style={theme.font.h2}>&nbsp; 축하합니다! 🎉</span>
              <Contents>
                <span>모든 문제를 완료했어요!</span>
                <span>정말 대단해요! 계속해서 실력을 키워나가세요.</span>
              </Contents>
            </Text>
            <Content>
              <Xp>
                <Title>
                  <img src={Star} alt="star" />
                  <span style={theme.font.b2}>획득한 XP</span>
                </Title>
                <span style={{ ...theme.font.h2, color: theme.color.resultXp }}>
                  +150 XP
                </span>
              </Xp>
              <Answer>
                <Title>
                  <img src={Correct} alt="correct" />
                  <span style={theme.font.b2}>정답률</span>
                </Title>
                <span
                  style={{ ...theme.font.h2, color: theme.color.green[600] }}
                >
                  85%
                </span>
                <span style={theme.font.l2}>17/20 문제 정답</span>
              </Answer>
            </Content>
          </div>
          <Button
            variant="tertiary2"
            size="result"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <img src={ResultCheck} alt="resultCheck" />
            완료하기
          </Button>
        </div>
      </Result>
    </Wrapper>
  );
};

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const Xp = styled.div`
  width: 384px;
  height: 104px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(90deg, #fef9c3 0%, #ffedd5 100%);
`;

const Answer = styled.div`
  width: 384px;
  height: 128px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(90deg, #dcfce7 0%, #d1fae5 100%);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 9px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Result = styled.div`
  width: 448px;
  height: 780px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: ${theme.color.white};
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  gap: 24px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #f3e8ff 0%, #fdf2f8 50%, #dbeafe 100%);
`;
