import styled from "@emotion/styled";
import { theme } from "@/themes";
import { Button, Input } from "@/components";
import { useState } from "react";

export const BlankProblem = () => {
  const [answer, setAnswer] = useState("");

  return (
    <Wrapper>
      <span style={theme.font.h2}>빈칸을 채워주세요</span>
      <Contents>
        <Problem>
          <span style={{ ...theme.font.h4, lineHeight: "200%" }}>
            데이터를 일시적으로 저장하는 메모리 영역으로, 후입선출(LIFO)
            방식으로 동작하는 자료구조를
            <span style={{ margin: "0px 20px" }}>
              <Input
                placeholder="답 입력"
                width="medium"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
              />
            </span>
            라고 한다.
          </span>
        </Problem>
      </Contents>
      <Buttons>
        <Button size="medium" variant="secondary">
          건너뛰기
        </Button>
        <Button size="medium">제출하기</Button>
      </Buttons>
    </Wrapper>
  );
};

const Buttons = styled.div`
  display: flex;
  gap: 53px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 70px;
  width: 100%;
`;
const Contents = styled.div``;
const Problem = styled.div`
  border-radius: 26px;
  border: 1px solid ${theme.color.green[500]};
  width: 930px;
  height: 226px;
  padding: 53px 74px 53px 74px;
  text-align: center; /* Center text content */
`;
