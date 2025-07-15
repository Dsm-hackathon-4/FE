import { Logo } from "@/assets";
import { Wrapper } from "./LoginPage";
import styled from "@emotion/styled";
import { theme } from "@/themes";
import { SelectBtn } from "@/components";

export const SelectAbilityPage = () => {
  const selectList = [
    "CS를 처음 배워요",
    "자주 사용되는 용어를 알고 있어요",
    "기본적인 CS 지식을 가지고 있어요",
    "대부분의 주제에 대해 상세하게 토론할 수 있어요",
  ];

  return (
    <Wrapper>
      <img src={Logo} alt="" />
      <Container>
        <span>CS를 얼마나 알고 계시나요?</span>
        <BtnDiv>
          {selectList.map((data, index) => (
            <SelectBtn key={index}>{data}</SelectBtn>
          ))}
        </BtnDiv>
      </Container>
    </Wrapper>
  );
};

const BtnDiv = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 42px;
  > span {
    font: ${theme.font.h2};
  }
`;
