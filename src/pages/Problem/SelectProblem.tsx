import styled from "@emotion/styled";
import { theme } from "@/themes";
import { Button } from "@/components";
import { Buttons } from "./BlankProblem";

export const SelectProblem = () => {
  const problem = ["스택", "큐", "트리", "그래프"];
  return (
    <Wrapper>
      <span style={theme.font.h2}>
        다음 중 후입선출(LIFO) 방식으로 동작하는 자료구조는?
      </span>
      <Contents>
        <Problem>
          {problem.map((item, index) => (
            <Button variant="tertiary" size="large" key={index}>
              {item}
            </Button>
          ))}
        </Problem>
        <Buttons>
          <Button size="small" variant="secondary">
            건너뛰기
          </Button>
          <Button size="small">제출하기</Button>
        </Buttons>
      </Contents>
    </Wrapper>
  );
};

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 94px;
  justify-content: center;
  align-items: center;
`;

const Problem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 62px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 84px;
  width: 100%;
`;
