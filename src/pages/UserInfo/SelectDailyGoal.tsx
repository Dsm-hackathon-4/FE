import { Logo } from "@/assets";
import { Wrapper } from "./LoginPage";
import { SelectBtn } from "@/components";
import styled from "@emotion/styled";
import { theme } from "@/themes";
import { useNavigate } from "react-router-dom";

export const SelectDailyGoalPage = () => {
  const navigate = useNavigate();
  const selectList = [
    { text: "하루 5분", Strength: "가볍게" },
    { text: "하루 10분", Strength: "보통" },
    { text: "하루 15분", Strength: "열심히" },
    { text: "하루 20분", Strength: "진지하게" },
  ];

  return (
    <Wrapper>
      <img src={Logo} alt="" />
      <Container>
        <span>일일 학습 목표가 무엇인가요?</span>
        <BtnDiv>
          {selectList.map((data, index) => (
            <SelectBtn
              key={index}
              children={data.text}
              children2={data.Strength}
              onClick={() => navigate("/selectStudyType")}
            />
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
