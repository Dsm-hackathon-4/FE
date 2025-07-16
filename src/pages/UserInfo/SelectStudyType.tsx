import { Wrapper } from "./LoginPage";
import styled from "@emotion/styled";
import { theme } from "@/themes";
import { Logo } from "@/assets";
import { useNavigate } from "react-router-dom";

export const SelectStudyTypePage = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <img src={Logo} alt="" />
      <Container>
        <span>어떤 방식으로 학습을 시작할까요?</span>
        <SelectDiv>
          <Select color={theme.color.primary}>
            <Contents onClick={() => navigate("/")}>
              <span style={{ ...theme.font.t1 }}>기초부터 시작하기</span>
              <span>CS 과정의 가장 쉬운 레슨부터 시작합니다!</span>
            </Contents>
            <span style={{ ...theme.font.h1 }}>☝️</span>
          </Select>
          <Select color={theme.color.primary2}>
            <Contents onClick={() => navigate("/")}>
              <span style={{ ...theme.font.t1 }}>내 레벨 찾기</span>
              <span>학습 시작 지점을 추천해드려요!</span>
            </Contents>
            <span style={{ ...theme.font.h1 }}>🧭</span>
          </Select>
        </SelectDiv>
      </Container>
    </Wrapper>
  );
};

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SelectDiv = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

const Select = styled.div<{ color: string }>`
  width: 499px;
  height: 150px;
  border-radius: 20px;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 40px 0px 30px;
  cursor: pointer;
  border: 1px solid ${theme.color.zinc[50]};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover {
    opacity: 0.8;
  }
`;

const Container = styled.div`
  > span {
    font: ${theme.font.h2};
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;
`;
