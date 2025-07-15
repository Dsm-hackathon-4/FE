import { Mascot } from "@/assets";
import { theme } from "@/themes";
import styled from "@emotion/styled";

export const ReviewPage = () => {
  return (
    <Wrapper>
      <Title>
        <span style={{ ...theme.font.h2 }}>데이터베이스 마스터로 성장하기</span>
      </Title>
      <Til>
        <Contents>
          <span style={{ ...theme.font.h1, color: theme.color.white }}>
            TIL과 함께 복습하기
          </span>
          <span style={{ ...theme.font.h4, color: theme.color.white }}>
            깃허브, 노션, 옵시디언에 기록한 내용으로 복습해보세요.
          </span>
        </Contents>
        <img src={Mascot} alt="" />
      </Til>
    </Wrapper>
  );
};

const Title = styled.div`
  display: flex;
  justify-content: left;
  width: 1012px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  cursor: pointer;
`;

const Til = styled.div`
  width: 100%;
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
