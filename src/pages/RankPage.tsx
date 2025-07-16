import { theme } from "@/themes";
import styled from "@emotion/styled";

export const RankPage = () => {
  return (
    <Wrapper>
      <Title>
        <span style={theme.font.h2}>랭킹</span>
        <span style={theme.font.b2}>상위 학습자들의 랭킹을 확인해보세요</span>
      </Title>
    </Wrapper>
  );
};

const Title = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
