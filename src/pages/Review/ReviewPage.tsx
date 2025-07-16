import { Mascot, HardIcon, WrongIcon } from "@/assets";
import { theme } from "@/themes";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export const ReviewPage = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Title>
        <span style={{ ...theme.font.h2 }}>데이터베이스 마스터로 성장하기</span>
      </Title>
      <Contents>
        <Til>
          <TilContents onClick={() => navigate("link")}>
            <span style={{ ...theme.font.h1, color: theme.color.white }}>
              TIL과 함께 복습하기
            </span>
            <span style={{ ...theme.font.h4, color: theme.color.white }}>
              깃허브, 노션, 옵시디언에 기록한 내용으로 복습해보세요.
            </span>
          </TilContents>
          <img src={Mascot} alt="" />
        </Til>
        <Wrong>
          <WrongContents>
            <span style={{ ...theme.font.h1, color: theme.color.white }}>
              틀린문제
            </span>
            <span style={{ ...theme.font.h4, color: theme.color.white }}>
              맞춤형 레슨으로 틀린 문제를 학습해보세요.
            </span>
          </WrongContents>
          <img src={WrongIcon} alt="" />
        </Wrong>
        <Hard>
          <HardContents>
            <span style={{ ...theme.font.h1, color: theme.color.white }}>
              고난이도 문제
            </span>
            <span style={{ ...theme.font.h4, color: theme.color.white }}>
              어려운 문제들을 복습해 실력을 끌어올리세요..{" "}
            </span>
          </HardContents>
          <img src={HardIcon} alt="" />
        </Hard>
      </Contents>
    </Wrapper>
  );
};

const Hard = styled.div`
  width: 1012px;
  height: 196px;
  border-radius: 20px;
  background-color: ${theme.color.hard};
  display: flex;
  justify-content: space-between;
  padding: 41px 0px 0px 39px;

  > img {
    align-self: flex-end;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 33px;
`;

const Wrong = styled.div`
  width: 1012px;
  height: 196px;
  border-radius: 20px;
  background-color: ${theme.color.wrong};
  display: flex;
  justify-content: space-between;
  padding: 41px 0px 0px 39px;

  > img {
    align-self: flex-end;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: left;
  width: 1012px;
`;

const TilContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  cursor: pointer;
`;

const WrongContents = styled(TilContents)``;
const Til = styled.div`
  width: 1012px;
  height: 371px;
  background-color: ${theme.color.til};
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  padding: 41px 0px 0px 39px;
  > img {
    align-self: flex-end;
  }
`;
const HardContents = styled(TilContents)``;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  align-items: center;
  padding: 99px 0px 55px 0px;
  gap: 50px;
`;
