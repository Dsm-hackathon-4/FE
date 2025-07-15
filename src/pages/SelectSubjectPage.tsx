import { Database, License, Logo, Network, Os } from "@/assets";
import { theme } from "@/themes";
import styled from "@emotion/styled";
import { Wrapper } from "./LoginPage";

interface SubjectProps {
  color: string;
  text: string;
}

export const SelectSubjectPage = () => {
  const subject = [
    {
      name: "데이터베이스",
      color: theme.color.green[900],
      icon: Database,
      text: theme.color.white,
    },
    {
      name: "네트워크",
      color: theme.color.green[600],
      icon: Network,
      text: theme.color.white,
    },
    {
      name: "운영체제",
      color: theme.color.green[400],
      icon: Os,
      text: theme.color.black,
    },
    {
      name: "자격증",
      color: theme.color.zinc[200],
      icon: License,
      text: theme.color.black,
    },
  ];
  return (
    <Wrapper>
      <img src={Logo} alt="" />
      <Container>
        <span>어떤 과목을 공부해보고 싶으신가요?</span>
        <SubjectDiv>
          {subject.map((data, index) => (
            <Subject key={index} color={data.color} text={data.text}>
              <img src={data.icon} alt="" />
              {data.name}
            </Subject>
          ))}
        </SubjectDiv>
      </Container>
    </Wrapper>
  );
};

const SubjectDiv = styled.div`
  display: flex;
  gap: 20px;
`;

const Subject = styled.div<SubjectProps>`
  width: 150px;
  height: 150px;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  font: ${theme.font.t1};
  color: ${(props) => props.text};
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover {
    opacity: 0.8;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  > span {
    font: ${theme.font.h2};
  }
`;
