import styled from "@emotion/styled";
import { theme } from "@/themes";
import { Button, CorrectModal } from "@/components";
import { Buttons } from "./BlankProblem";
import { useState } from "react";

export const SelectProblem = () => {
  const problem = ["스택", "큐", "트리", "그래프"];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CorrectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="wrong"
      />
      <Wrapper>
        <ProblemText style={theme.font.h4}>
          인터넷에서 컴퓨터들이 서로 통신하기 위해 사용하는 프로토콜로, 데이터를
          패킷 단위로 나누어 전송하며 신뢰성 있는 연결을 보장하는 전송 계층
          프로토콜입니다. 3-way handshake를 통해 연결을 설정하고 4-way
          handshake를 통해 연결을 종료합니다.
        </ProblemText>
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
            <Button size="small" onClick={() => setIsModalOpen(true)}>
              제출하기
            </Button>
          </Buttons>
        </Contents>
      </Wrapper>
    </>
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

const ProblemText = styled.span`
  max-width: 1300px;
  text-align: center;
`;
